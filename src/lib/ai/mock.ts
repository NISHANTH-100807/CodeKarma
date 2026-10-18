import {
  AIProvider,
  TutorContext,
  TaskContext,
  ExplainBackResult,
  QuizQuestion,
} from "./provider";

export class MockAIProvider implements AIProvider {
  async getTutorResponse(
    question: string,
    context: TutorContext,
    _hintLevel?: number
  ): Promise<string> {
    const qLower = question.toLowerCase();

    if (qLower.includes("how") && (qLower.includes("add") || qLower.includes("task"))) {
      return `To add an item to state in React, remember that state should be treated as immutable! 
Instead of mutating the array directly with \`.push()\`, create a new array with the spread operator:
\`\`\`ts
setTasks([...tasks, newTask]);
\`\`\`
Also don't forget to reset your input state back to an empty string so the field clears.`;
    }

    if (qLower.includes("toggle") || qLower.includes("complete") || qLower.includes("checkbox")) {
      return `To toggle an item's status, use \`.map()\` to produce a updated list.
For the item that matches the clicked ID, return a new object with \`completed: !t.completed\`, and for all other items, return them unchanged:
\`\`\`ts
setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
\`\`\``;
    }

    if (qLower.includes("error") || qLower.includes("bug") || qLower.includes("why")) {
      return `Let's analyze what the component is doing. Notice what triggers when the event occurs:
1. Is an \`onClick\` handler bound to the element?
2. Are you preserving prior items when updating the array?
3. Does the key prop in your list remain stable across renders?
Check the developer console in the preview pane below to see runtime traces.`;
    }

    return `Great question! In **${context.taskTitle}**, key concepts are ${context.concepts.join(
      ", "
    )}.
Remember the core principle: state drives UI. When state changes through your setter function, React re-renders with the new snapshot. What specific part of the flow feels tricky right now?`;
  }

  async evaluateExplainBack(
    response: string,
    _question: string,
    _taskId: string
  ): Promise<ExplainBackResult> {
    const wordCount = response.trim().split(/\s+/).length;
    const mentionsState = /state|usestate|immutable|spread|render|array|toggle|set/i.test(response);

    let score = 70;
    const strengths: string[] = [];
    const areasToImprove: string[] = [];

    if (mentionsState) {
      score += 20;
      strengths.push("Accurately mentioned React state dynamics and immutability.");
    } else {
      areasToImprove.push("Try mentioning React's useState and immutability principles.");
    }

    if (wordCount >= 20) {
      score += 10;
      strengths.push("Provided a detailed explanation with good reasoning.");
    } else {
      areasToImprove.push("Expand on the mechanics: explain WHY React requires creating new references.");
    }

    score = Math.min(100, Math.max(50, score));

    return {
      score,
      feedback:
        score >= 85
          ? "Outstanding conceptual breakdown! You clearly understand how React manages component re-renders through immutable state snapshots."
          : "Good effort! You grasp the basic behavior. Strengthening your explanation of immutable state updates will make your mental model rock solid.",
      strengths,
      areasToImprove,
    };
  }

  async generateQuiz(code: string, concepts: string[]): Promise<QuizQuestion[]> {
    return [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Why should you never use `tasks.push(newTask)` directly in React?",
        options: [
          "Arrays in JavaScript are read-only",
          "It mutates state directly, so React cannot detect the reference change and won't re-render",
          "It converts the array into an Object",
          "It throws a syntax error in strict mode",
        ],
        correctAnswer: 1,
        explanation:
          "React compares previous and next states by object reference (Object.is). In-place mutation preserves the memory address, causing React to skip UI updates.",
        concept: concepts[0] || "React State",
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What is the purpose of the `key` prop when rendering a dynamic list with `.map()`?",
        options: [
          "It provides a CSS selector for styling each element",
          "It helps React identify which items have changed, been added, or been removed during reconciliation",
          "It automatically binds click handlers to each row",
          "It encrypts the item data inside DOM nodes",
        ],
        correctAnswer: 1,
        explanation:
          "Keys give items a persistent identity through re-renders, enabling efficient DOM diffing and preserving local component state.",
        concept: concepts[2] || "Lists & Keys",
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "In controlled inputs, what synchronizes the `<input>` text with React state?",
        options: [
          "The `name` attribute matching variable names",
          "Setting `value={inputValue}` and handling updates via `onChange={(e) => setInputValue(e.target.value)}`",
          "Using HTML5 `autofocus` attribute",
          "Importing useRef from React DOM",
        ],
        correctAnswer: 1,
        explanation:
          "Controlled components ensure React is the single source of truth: `value` dictates the display, and `onChange` updates state.",
        concept: concepts[1] || "Event Handlers",
      },
    ];
  }

  async getPredictionFeedback(prediction: string, actual: string, _code?: string): Promise<string> {
    if (prediction.trim().toLowerCase() === actual.trim().toLowerCase()) {
      return "Spot on! Your mental execution matches the JavaScript runtime.";
    }
    return `Close! You predicted: "${prediction}". In reality: "${actual}". Trace through the execution stack to see why that occurred.`;
  }

  async getHintContent(level: number, task: TaskContext): Promise<string> {
    switch (level) {
      case 1:
        return `💡 **Level 1 (Guiding Question):**
Look at the component's interactive elements in \`${task.taskTitle}\`. When a user clicks or types, which event handler is supposed to trigger? What function is currently missing or unconnected?`;

      case 2:
        return `🧭 **Level 2 (Concept Nudge):**
Remember that React state updates are asynchronous and require new object/array references.
- For adding: Combine existing array with new item using the spread operator \`[...prev, newItem]\`.
- For toggling: Transform elements with \`.map()\` to produce a fresh array.`;

      case 3:
        return `🛠️ **Level 3 (Code Skeleton):**
Here is the architectural structure needed:
\`\`\`typescript
const addTask = () => {
  if (!inputValue.trim()) return;
  // TODO: create new item with Date.now() id, text, and completed: false
  // TODO: setTasks with spread array
  // TODO: setInputValue back to empty string
};

const toggleTask = (id: number) => {
  // TODO: setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
};
\`\`\``;

      case 4:
        return `🎯 **Level 4 (Concrete Implementation Example):**
Here is the complete pattern for reference:
\`\`\`typescript
const addTask = () => {
  if (!inputValue.trim()) return;
  setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), completed: false }]);
  setInputValue('');
};

// In your JSX:
<button onClick={addTask} className="bg-violet-600 text-white px-4 py-2 rounded">
  Add
</button>
\`\`\``;

      default:
        return "You have unlocked all progressive hints for this task. You are ready to run and test your code!";
    }
  }
}
