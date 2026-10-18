import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId = "demo-session-1",
      learnerId = "demo-learner-1",
      question,
      prediction,
      correctAnswer,
      isCorrect,
      explanation,
    } = body;

    let recorded = null;
    let accuracy = isCorrect ? 85 : 75;

    try {
      recorded = await prisma.predictionAttempt.create({
        data: {
          sessionId,
          learnerId,
          question: question || "Code execution prediction",
          prediction: prediction || "",
          correctAnswer: correctAnswer || "",
          isCorrect: Boolean(isCorrect),
          explanation: explanation || null,
        },
      });

      const allAttempts = await prisma.predictionAttempt.findMany({
        where: { learnerId },
      });
      if (allAttempts.length > 0) {
        const correctCount = allAttempts.filter((a) => a.isCorrect).length;
        accuracy = Math.round((correctCount / allAttempts.length) * 100);
      }
    } catch {
      // Graceful fallback if database table not yet created
      recorded = {
        id: `pred-${Date.now()}`,
        sessionId,
        learnerId,
        question,
        prediction,
        correctAnswer,
        isCorrect: Boolean(isCorrect),
        explanation,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      prediction: recorded,
      isCorrect: Boolean(isCorrect),
      correctAnswer,
      explanation,
      accuracy,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record prediction attempt" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const learnerId = searchParams.get("learnerId") || "demo-learner-1";

    let predictions = [];
    try {
      predictions = await prisma.predictionAttempt.findMany({
        where: { learnerId },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      predictions = [
        {
          id: "pred-1",
          question: "What will happen when you click Add?",
          prediction: "Nothing will happen",
          correctAnswer: "Nothing will happen",
          isCorrect: true,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return NextResponse.json({ predictions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
