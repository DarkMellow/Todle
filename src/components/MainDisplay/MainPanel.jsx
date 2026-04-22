//import { useState } from "react";

import Task from "./Task";
import TopBar from "./TopBar";

export default function MainPanel({ tasks, tags, setActivePanel, setSidebarOpen, sidebarOpen }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <TopBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="flex flex-col px-5">
        <p className="text-[32px] tracking-tight font-medium text-(--color-1)">Today</p>

        <div>
          {tasks.map(t => <Task key={t.id} title={t.title} description={t.description} dueDate={t.dueDate} tags={t.tags} allTags={tags} />)}
        </div>

        <button
          onClick={() => setActivePanel(true)}
          className="cursor-pointer text-sm font-bold text-(--color-5) border py-2 border-(--color-8) text-center p-1 rounded-sm shrink-0 w-[350px] hover:bg-(--color-9) transition-colors">Add Task
        </button>
      </div>
    </div>
  );
}
