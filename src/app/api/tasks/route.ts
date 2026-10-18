import { NextResponse } from "next/server";
import { TASKS, getAllTasks, getTaskById } from "@/lib/tasks";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const task = getTaskById(id);
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      return NextResponse.json({ task });
    }

    return NextResponse.json({ tasks: getAllTasks() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
