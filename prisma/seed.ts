import { PrismaClient } from "@prisma/client";
import { TASKS } from "../src/lib/tasks";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Mentor database...");

  // Upsert Demo Learner
  const learner = await prisma.learner.upsert({
    where: { email: "demo@mentor.dev" },
    update: {},
    create: {
      id: "demo-learner-1",
      name: "Demo Learner",
      email: "demo@mentor.dev",
      avatar: "DL",
    },
  });

  console.log("Seeded learner:", learner.id);

  // Seed Learning Tasks
  for (const t of TASKS) {
    await prisma.learningTask.upsert({
      where: { id: t.id },
      update: {
        title: t.title,
        description: t.description,
        difficulty: t.difficulty,
        concepts: JSON.stringify(t.concepts),
        starterCode: t.starterCode,
        solutionCode: t.solutionCode,
        objectives: JSON.stringify(t.objectives),
        requirements: JSON.stringify(t.requirements),
        hasBugChallenge: t.hasBugChallenge,
        buggyCode: t.buggyCode,
        bugDescription: t.bugDescription,
      },
      create: {
        id: t.id,
        title: t.title,
        description: t.description,
        difficulty: t.difficulty,
        concepts: JSON.stringify(t.concepts),
        starterCode: t.starterCode,
        solutionCode: t.solutionCode,
        objectives: JSON.stringify(t.objectives),
        requirements: JSON.stringify(t.requirements),
        hasBugChallenge: t.hasBugChallenge,
        buggyCode: t.buggyCode,
        bugDescription: t.bugDescription,
      },
    });
  }

  // Seed Concept Mastery Scores
  const conceptScores = [
    { concept: "React State", score: 88 },
    { concept: "Event Handlers", score: 82 },
    { concept: "Lists & Keys", score: 75 },
    { concept: "Immutability", score: 90 },
    { concept: "Reconciliation", score: 70 },
    { concept: "Debugging", score: 85 },
  ];

  for (const cs of conceptScores) {
    await prisma.conceptMastery.upsert({
      where: {
        learnerId_concept: {
          learnerId: learner.id,
          concept: cs.concept,
        },
      },
      update: { score: cs.score },
      create: {
        learnerId: learner.id,
        concept: cs.concept,
        score: cs.score,
      },
    });
  }

  // Seed Initial Session
  const session = await prisma.session.upsert({
    where: { id: "demo-session-1" },
    update: {},
    create: {
      id: "demo-session-1",
      learnerId: learner.id,
      taskId: "task-1",
      status: "active",
      currentHintLevel: 1,
    },
  });

  console.log("Seeded session:", session.id);
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
