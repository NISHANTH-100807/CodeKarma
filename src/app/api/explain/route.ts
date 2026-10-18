import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAIProvider } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type = "tutor",
      question = "",
      context,
      response,
      taskId = "task-1",
      sessionId = "demo-session-1",
      learnerId = "demo-learner-1",
    } = body;

    const aiProvider = getAIProvider();

    if (type === "tutor") {
      const tutorReply = await aiProvider.getTutorResponse(
        question,
        context || {
          taskTitle: "React Task",
          taskDescription: "React practice",
          currentCode: "",
          concepts: ["React State"],
        },
        context?.hintLevel
      );

      return NextResponse.json({
        success: true,
        response: tutorReply,
      });
    }

    if (type === "evaluate") {
      const evaluation = await aiProvider.evaluateExplainBack(
        response || "",
        question,
        taskId
      );

      try {
        await prisma.explainBackAttempt.create({
          data: {
            learnerId,
            sessionId,
            question,
            response: response || "",
            score: evaluation.score,
            feedback: evaluation.feedback,
          },
        });

        // Boost concept mastery
        await prisma.conceptMastery.upsert({
          where: {
            learnerId_concept: {
              learnerId,
              concept: "React State",
            },
          },
          update: {
            score: Math.min(100, evaluation.score),
          },
          create: {
            learnerId,
            concept: "React State",
            score: evaluation.score,
          },
        });
      } catch {
        // Fallback gracefully
      }

      return NextResponse.json({
        success: true,
        evaluation,
      });
    }

    return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
  } catch (error) {
    console.error("Explain route error:", error);
    return NextResponse.json(
      { error: "Failed to process explain request" },
      { status: 500 }
    );
  }
}
