const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TASKS = [
  {
    id: "task-1",
    title: "Build a Task Tracker",
    description: "Build a working todo list component using React state",
    difficulty: "beginner",
    concepts: ["React State", "Event Handlers", "Lists & Keys"],
    objectives: [
      "Understand useState for managing lists",
      "Handle form input and submission",
      "Render a dynamic list of items",
      "Implement item completion toggling",
    ],
    requirements: [
      "Add new tasks via input and button",
      "Display all tasks in a list",
      "Toggle task completion",
      "Input clears after adding",
    ],
    starterCode: `import React, { useState } from 'react';\n\nexport default function TaskTracker() {\n  const [tasks, setTasks] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  return <div className="p-4">Task Tracker</div>;\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function TaskTracker() {\n  const [tasks, setTasks] = useState([]);\n  const [inputValue, setInputValue] = useState('');\n  const addTask = () => { if (!inputValue.trim()) return; setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), completed: false }]); setInputValue(''); };\n  return <div className="p-4">Task Tracker</div>;\n}`,
    hasBugChallenge: true,
    buggyCode: null,
    bugDescription: "Adding task replaces the list instead of appending; toggle affects all tasks.",
  },
  {
    id: "task-2",
    title: "React State and Events",
    description: "Master useState hooks and event handling patterns",
    difficulty: "beginner",
    concepts: ["React State", "Event Handlers", "Controlled Inputs"],
    objectives: [
      "Understand the useState hook",
      "Handle click and change events",
      "Build controlled form inputs",
    ],
    requirements: [
      "Create a counter with increment/decrement",
      "Show current count value",
      "Implement reset functionality",
    ],
    starterCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  return <div className="p-4">Counter</div>;\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <div className="p-4">{count}</div>;\n}`,
    hasBugChallenge: false,
    buggyCode: null,
    bugDescription: null,
  },
  {
    id: "task-3",
    title: "Debug: Broken Component",
    description: "Find and fix bugs in a broken React component",
    difficulty: "intermediate",
    concepts: ["Debugging", "React State", "Event Handlers"],
    objectives: [
      "Read and understand existing code",
      "Identify bugs by observing behavior",
      "Apply fixes methodically",
    ],
    requirements: [
      "Identify all bugs in the component",
      "Fix task list replacement bug",
      "Fix toggle all bug",
    ],
    starterCode: `import React, { useState } from 'react';\n\nexport default function BuggyTaskTracker() {\n  return <div className="p-4">Buggy Tracker</div>;\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function FixedTaskTracker() {\n  return <div className="p-4">Fixed Tracker</div>;\n}`,
    hasBugChallenge: true,
    buggyCode: null,
    bugDescription: "The starter code IS the buggy component. Find and fix both bugs.",
  },
];

async function main() {
  console.log("Seeding database via Node.js runner...");

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

  await prisma.session.upsert({
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

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
