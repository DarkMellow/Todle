//import { useState } from "react";

import Task from "./Task";

export default function MainPanel({ tasks, tags, setActivePanel }) {
  return (
    <div className="p-4">
      <p className="text-[32px] tracking-tight font-medium mb-6">Today</p>

      <div>
        {tasks.map(t => <Task key={t.id} title={t.title} description={t.description} dueDate={t.dueDate} tags={t.tags} allTags={tags} />)}
      </div>

      <button
        onClick={() => setActivePanel(true)}
        className="cursor-pointer text-sm font-bold text-gray-700 border py-2 border-gray-300 text-center p-1 rounded-sm shrink-0 w-[350px]">Add Task
      </button>
    </div>
  );
}
