import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cohortStats = {
      cohortName: "React Engineering Cohort Alpha",
      totalStudents: 28,
      activeToday: 24,
      avgPredictionAccuracy: 78,
      avgHintsPerTask: 2.1,
      strugglingConcept: "State Immutability & Reference Equality",
    };

    const conceptHeatmap = [
      { concept: "React State", average: 84, distribution: { high: 18, mid: 8, low: 2 } },
      { concept: "Event Handlers", average: 81, distribution: { high: 16, mid: 9, low: 3 } },
      { concept: "Lists & Keys", average: 74, distribution: { high: 12, mid: 11, low: 5 } },
      { concept: "Immutability & Spread", average: 63, distribution: { high: 7, mid: 13, low: 8 } },
      { concept: "Controlled Inputs", average: 86, distribution: { high: 20, mid: 6, low: 2 } },
      { concept: "Planted Bug Debugging", average: 69, distribution: { high: 9, mid: 12, low: 7 } },
    ];

    const students = [
      {
        id: "s1",
        name: "Demo Learner (You)",
        email: "demo@mentor.dev",
        streak: 4,
        mastery: 82,
        predictionAccuracy: 85,
        avgHints: 1.8,
        status: "Exceeding Pace",
        lastActive: "Active Now",
      },
      {
        id: "s2",
        name: "Alex Rivera",
        email: "alex.r@school.edu",
        streak: 5,
        mastery: 89,
        predictionAccuracy: 92,
        avgHints: 1.2,
        status: "Mastery Leader",
        lastActive: "15m ago",
      },
      {
        id: "s3",
        name: "Sarah Chen",
        email: "s.chen@school.edu",
        streak: 3,
        mastery: 65,
        predictionAccuracy: 58,
        avgHints: 3.4,
        status: "Needs Intervention",
        lastActive: "1h ago",
      },
      {
        id: "s4",
        name: "Marcus Johnson",
        email: "marcus.j@school.edu",
        streak: 2,
        mastery: 77,
        predictionAccuracy: 74,
        avgHints: 2.3,
        status: "On Track",
        lastActive: "3h ago",
      },
      {
        id: "s5",
        name: "Elena Rostova",
        email: "elena.r@school.edu",
        streak: 6,
        mastery: 91,
        predictionAccuracy: 90,
        avgHints: 1.0,
        status: "Mastery Leader",
        lastActive: "5h ago",
      },
    ];

    const interventionAlerts = [
      {
        studentName: "Sarah Chen",
        issue: "High Hint Dependency on Immutability (3.4 avg hints)",
        recommendedAction: "Assign Feynman Explain-Back module on React Reference Equality",
      },
      {
        studentName: "Marcus Johnson",
        issue: "Low Prediction Accuracy on List Key Reconciliation (40%)",
        recommendedAction: "Review diffing algorithm visualization in Task 1",
      },
    ];

    return NextResponse.json({
      cohortStats,
      conceptHeatmap,
      students,
      interventionAlerts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch instructor dashboard data" },
      { status: 500 }
    );
  }
}
