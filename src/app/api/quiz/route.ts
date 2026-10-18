import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAIProvider } from "@/lib/ai";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conceptsParam = searchParams.get("concepts");
    const concepts = conceptsParam
      ? conceptsParam.split(",")
      : ["React State", "Event Handlers", "Lists & Keys"];

    const aiProvider = getAIProvider();
    const questions = await aiProvider.generateQuiz("", concepts);

    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId = "demo-session-1",
      learnerId = "demo-learner-1",
      questions,
      answers,
      score,
      feedback = "Good conceptual performance.",
    } = body;

    let attempt;
    try {
      attempt = await prisma.quizAttempt.create({
        data: {
          sessionId,
          learnerId,
          questions: JSON.stringify(questions || []),
          answers: JSON.stringify(answers || {}),
          score: Number(score) || 0,
          feedback: JSON.stringify(feedback),
        },
      });

      // Update concept mastery
      await prisma.conceptMastery.upsert({
        where: {
          learnerId_concept: {
            learnerId,
            concept: "Event Handlers",
          },
        },
        update: {
          score: Math.min(100, Number(score) || 80),
        },
        create: {
          learnerId,
          concept: "Event Handlers",
          score: Number(score) || 80,
        },
      });
    } catch {
      attempt = {
        id: `quiz-${Date.now()}`,
        sessionId,
        learnerId,
        score,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      quizAttempt: attempt,
      score,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save quiz attempt" },
      { status: 500 }
    );
  }
}
