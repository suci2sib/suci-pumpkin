import React, { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Marketing dashboard app", checked: false },
    { id: 2, text: "Create new version 4.0", checked: false },
    { id: 3, text: "User Testing", checked: true },
    { id: 4, text: "Design system", checked: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const remaining = tasks.filter(t => !t.checked).length;

  return (
    <div className="flex flex-col flex-1">
      <p className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-wider">
        {remaining} of {tasks.length} remaining
      </p>
      <div className="flex flex-col gap-4">
        {tasks.map(task => (
          <label key={task.id} className="flex items-center gap-3 cursor-pointer group select-none text-xs font-bold text-gray-600">
            <input 
              type="checkbox" 
              checked={task.checked} 
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400 accent-pink-500"
            />
            <span className={`transition-all ${task.checked ? "line-through text-gray-300 font-medium" : "text-gray-700 group-hover:text-pink-500"}`}>
              {task.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}