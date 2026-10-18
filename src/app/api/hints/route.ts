import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAIProvider, TaskContext } from "@/lib/ai";

// In-memory session hint levels tracker for resilience
const sessionHintTracker = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId = "demo-session-1",
      learnerId = "demo-learner-1",
      requestedLevel,
      taskContext,
    } = body;

    let currentLevel = sessionHintTracker.get(sessionId) || 0;

    // Look up session in DB if available
    try {
      const dbSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (dbSession) {
        currentLevel = dbSession.currentHintLevel;
      }
    } catch {
      // Use in-memory tracker
    }

    // SERVER-SIDE VALIDATION: Can only increment by 1
    const targetLevel = Math.min(currentLevel + 1, 4);

    // If client requested a level beyond allowed, enforce targetLevel
    const validatedLevel = Math.min(requestedLevel || targetLevel, targetLevel);

    // Generate or fetch hint content based on level
    const aiProvider = getAIProvider();
    const taskData: TaskContext = taskContext || {
      taskId: "task-1",
      taskTitle: "Build a Task Tracker",
      taskDescription: "Build a working todo list component using React state",
      currentCode: "",
      concepts: ["React State", "Event Handlers", "Lists & Keys"],
    };

    const hintContent = await aiProvider.getHintContent(validatedLevel, taskData);

    // Update session hint level
    sessionHintTracker.set(sessionId, validatedLevel);

    try {
      await prisma.session.update({
        where: { id: sessionId },
        data: { currentHintLevel: validatedLevel },
      });

      await prisma.hintUsage.create({
        data: {
          sessionId,
          learnerId,
          level: validatedLevel,
          content: hintContent,
        },
      });
    } catch {
      // In-memory tracker already set
    }

    return NextResponse.json({
      success: true,
      hint: {
        level: validatedLevel,
        content: hintContent,
        previousLevel: currentLevel,
      },
    });
  } catch (error) {
    console.error("Hint server error:", error);
    return NextResponse.json(
      { error: "Failed to generate validated hint" },
      { status: 500 }
    );
  }
}
