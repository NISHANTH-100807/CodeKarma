import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const learnerId = searchParams.get("learnerId") || "demo-learner-1";

    let learnerData = null;
    try {
      learnerData = await prisma.learner.findUnique({
        where: { id: learnerId },
        include: {
          conceptMastery: true,
          predictions: { orderBy: { createdAt: "desc" }, take: 10 },
          hintUsages: true,
          explainBacks: { orderBy: { createdAt: "desc" }, take: 5 },
          quizAttempts: { orderBy: { createdAt: "desc" }, take: 5 },
        },
      });
    } catch {
      // Fallback
    }

    // Concept Radar scores
    const concepts = [
      { concept: "React State", score: 88 },
      { concept: "Event Handlers", score: 82 },
      { concept: "Lists & Keys", score: 75 },
      { concept: "Immutability", score: 90 },
      { concept: "Reconciliation", score: 70 },
      { concept: "Debugging", score: 85 },
    ];

    // Prediction accuracy history (last 6 attempts)
    const predictionHistory = [
      { date: "Oct 12", accuracy: 66 },
      { date: "Oct 13", accuracy: 75 },
      { date: "Oct 14", accuracy: 80 },
      { date: "Oct 15", accuracy: 83 },
      { date: "Oct 16", accuracy: 88 },
      { date: "Oct 17", accuracy: 91 },
    ];

    // Hints per challenge
    const hintsPerTask = [
      { task: "Task Tracker", hints: 2 },
      { task: "State & Events", hints: 1 },
      { task: "Broken Counter", hints: 3 },
    ];

    // Recent activity log
    const recentActivity = [
      {
        id: "act-1",
        type: "prediction",
        title: "Predicted Event Handler Execution",
        result: "Correct",
        timestamp: "12 minutes ago",
      },
      {
        id: "act-2",
        type: "hint",
        title: "Unlocked Level 2 Hint: Concept Nudge",
        result: "Immutability Pattern",
        timestamp: "45 minutes ago",
      },
      {
        id: "act-3",
        type: "explain",
        title: "Feynman Assessment: State Re-rendering",
        result: "Score: 88/100",
        timestamp: "Yesterday",
      },
      {
        id: "act-4",
        type: "bug",
        title: "Resolved Planted Bug: Array Replacement",
        result: "Diagnosed & Fixed",
        timestamp: "2 days ago",
      },
    ];

    return NextResponse.json({
      stats: {
        streakDays: 4,
        conceptMasteryPercent: 82,
        predictionAccuracyPercent: 85,
        avgHintsUsed: 1.8,
        quizzesCompleted: 6,
        bugsResolved: 3,
      },
      concepts,
      predictionHistory,
      hintsPerTask,
      recentActivity,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate learning analytics" },
      { status: 500 }
    );
  }
}
