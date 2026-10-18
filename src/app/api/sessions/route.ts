import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const learnerId = searchParams.get("learnerId") || "demo-learner-1";

    let sessions = [];
    try {
      sessions = await prisma.session.findMany({
        where: { learnerId },
        include: {
          task: true,
          predictions: true,
          hintUsages: true,
        },
        orderBy: { startedAt: "desc" },
      });
    } catch {
      // Fallback if DB is not migrated yet
      sessions = [
        {
          id: "demo-session-1",
          taskId: "task-1",
          status: "active",
          currentHintLevel: 1,
          startedAt: new Date().toISOString(),
          task: { title: "Build a Task Tracker", difficulty: "beginner" },
          predictions: [{ isCorrect: true }],
        },
      ];
    }

    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId = "task-1", learnerId = "demo-learner-1" } = body;

    let session;
    try {
      session = await prisma.session.create({
        data: {
          learnerId,
          taskId,
          status: "active",
          currentHintLevel: 0,
        },
      });
    } catch {
      session = {
        id: `sess-${Date.now()}`,
        learnerId,
        taskId,
        status: "active",
        currentHintLevel: 0,
        startedAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ session });
  } catch (error) {
    return NextResponse.json({ error: "Failed to initialize session" }, { status: 500 });
  }
}
