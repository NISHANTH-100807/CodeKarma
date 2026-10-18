export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  concepts: string[];
  objectives: string[];
  requirements: string[];
  starterCode: string;
  solutionCode: string;
  predictions: PredictionQuestion[];
  hasBugChallenge: boolean;
  buggyCode?: string | null;
  bugDescription?: string | null;
}

export const TASKS: TaskDefinition[] = [
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
    starterCode: `import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  // TODO: Implement addTask function
  // It should add a new task to the tasks array
  // and clear the inputValue

  // TODO: Implement toggleTask function  
  // It should toggle the completed status of a task

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Task Tracker</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
        />
        {/* TODO: Add onClick handler to the button */}
        <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded transition-colors font-medium">
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-slate-500 italic">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 p-2 bg-slate-800/60 border border-slate-700/60 rounded cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <span className={task.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Task Tracker</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
        />
        <button onClick={addTask} className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded transition-colors font-medium">
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-slate-500 italic">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-2 p-2 bg-slate-800/60 border border-slate-700/60 rounded cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)} 
                className="rounded accent-violet-600 cursor-pointer"
              />
              <span className={task.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    predictions: [
      {
        question: "What will happen when you click the Add button with the starter code?",
        options: [
          "A new task will appear in the list",
          "Nothing will happen — the button has no onClick handler",
          "The input will clear but no task is added",
          "An error will appear in the console",
        ],
        correctIndex: 1,
        explanation: "The button has no onClick handler, so clicking it does nothing. You need to implement addTask and connect it to the button.",
      },
      {
        question: "If you mutate tasks with `tasks.push(newTask)` instead of `setTasks([...tasks, newTask])`, what happens?",
        options: [
          "React updates instantly because arrays are mutable",
          "React will throw an unhandled syntax exception",
          "React will not re-render the UI because the state array reference didn't change",
          "The item is added to local storage instead of state",
        ],
        correctIndex: 2,
        explanation: "React relies on shallow reference equality. Mutating the existing array keeps the same reference, so React skips re-rendering.",
      },
      {
        question: "Why should `inputValue` be reset to empty string `''` inside `addTask`?",
        options: [
          "To provide immediate feedback that the task was successfully added",
          "Because React will crash if text remains in state",
          "To free memory from JavaScript heap immediately",
          "Because inputs cannot hold more than one value per session",
        ],
        correctIndex: 0,
        explanation: "Clearing the input resets the controlled component state so the user can easily type their next task.",
      }
    ],
    hasBugChallenge: true,
    buggyCode: `import React, { useState } from 'react';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (!inputValue.trim()) return;
    // BUG: spreading tasks wrongly — always creates array with just one item
    setTasks([{ id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    // BUG: updates wrong item — toggles ALL items instead of just clicked one  
    setTasks(tasks.map(t => ({ ...t, completed: !t.completed })));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Task Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add task..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
        />
        <button onClick={addTask} className="bg-violet-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2 p-2 bg-slate-800/60 border border-slate-700 rounded cursor-pointer"
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    bugDescription: "This component has 2 bugs: (1) Adding a task replaces the list instead of appending, (2) Toggling completion affects ALL tasks instead of just the clicked one.",
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
    starterCode: `import React, { useState } from 'react';

export default function Counter() {
  // TODO: Add state for count
  
  return (
    <div className="p-6 max-w-sm mx-auto text-center bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold text-cyan-400 mb-2">Counter</h1>
      <div className="text-5xl font-extrabold my-6 text-violet-400">0</div>
      <div className="flex gap-3 justify-center">
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-lg font-bold border border-slate-700">-</button>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700">Reset</button>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-lg font-bold border border-slate-700">+</button>
      </div>
    </div>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6 max-w-sm mx-auto text-center bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold text-cyan-400 mb-2">Counter</h1>
      <div className="text-5xl font-extrabold my-6 text-violet-400">{count}</div>
      <div className="flex gap-3 justify-center">
        <button 
          onClick={() => setCount(c => c - 1)} 
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-lg font-bold border border-slate-700 transition-colors"
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)} 
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm text-slate-300 border border-slate-700 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(c => c + 1)} 
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-lg font-bold border border-slate-700 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}`,
    predictions: [
      {
        question: "When clicking the '+' button with `onClick={() => setCount(count + 1)}`, what determines the next count?",
        options: [
          "The DOM value of the counter display element",
          "The count variable captured in the current render closure",
          "A global counter stored in window.React",
          "The number of times the component was mounted",
        ],
        correctIndex: 1,
        explanation: "State updates in closures use the snapshot from the current render. Using updater function `setCount(c => c + 1)` is best practice for sequential updates.",
      }
    ],
    hasBugChallenge: false,
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
    starterCode: `// Find and fix the bugs in this component!
// Hint: There are 2 bugs to find.

import React, { useState } from 'react';

export default function BuggyTaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (!inputValue.trim()) return;
    // Something is wrong here...
    setTasks([{ id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    // Something is wrong here too...
    setTasks(tasks.map(t => ({ ...t, completed: !t.completed })));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Task Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          placeholder="New task..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
        />
        <button onClick={addTask} className="bg-violet-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2 p-2 bg-slate-800/60 border border-slate-700 rounded cursor-pointer"
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

export default function FixedTaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-xl shadow-lg border border-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Task Tracker (Fixed)</h1>
      <div className="flex gap-2 mb-4">
        <input 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          placeholder="New task..."
          className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
        />
        <button onClick={addTask} className="bg-violet-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2 p-2 bg-slate-800/60 border border-slate-700 rounded cursor-pointer"
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    predictions: [
      {
        question: "When you add a second item to this buggy tracker, what will happen?",
        options: [
          "The second item will be appended to the first item",
          "The first item will disappear, and only the second item will remain",
          "Both items will display with duplicate keys",
          "A runtime TypeError will occur",
        ],
        correctIndex: 1,
        explanation: "Because `setTasks([{ id: Date.now(), ... }])` creates a brand new array with only the single item rather than spreading `[...tasks, newObj]`, previous items are lost.",
      }
    ],
    hasBugChallenge: true,
    buggyCode: null,
    bugDescription: "The starter code IS the buggy component. Find and fix both bugs: (1) task list replacement, and (2) toggle updating all tasks.",
  }
];

export function getAllTasks(): TaskDefinition[] {
  return TASKS;
}

export function getTaskById(id: string): TaskDefinition | undefined {
  return TASKS.find((t) => t.id === id);
}
