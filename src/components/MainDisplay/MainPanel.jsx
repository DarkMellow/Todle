//import { useState } from "react";

import Task from "./Task";

export default function MainPanel({ tasks, setActivePanel }) {
  return (
    <div>
      <div className="p-4 flex flex-col items-center">
        <p className="text-[32px] tracking-tight font-bold mb-6">Today</p>

        <button
          onClick={() => setActivePanel(true)}
          className="cursor-pointer text-sm font-bold text-gray-700 border py-2 border-gray-300 text-center p-1 rounded-sm shrink-0 w-[350px]">Add Task</button>
      </div>

      <div className="p-4">
        {tasks.map(t => <Task key={t.id} title={t.title} />)}
      </div>
    </div>
  );
}
