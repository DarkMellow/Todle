import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
  EyeClosedIcon, EyeIcon,
  PlusIcon,
} from '@phosphor-icons/react';

import Task from "../components/Tasks/Task";
import TaskAdder from "../components/Tasks/TaskAdder";
import TaskEditModal from "../components/Tasks/TaskEditModal";

export default function Today() {
  const { tasks, setActivePanel, isEditTaskOpen, activeTask } = useContext(AppContext);
  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  return (
    <div className="flex flex-col py-[30px] w-full max-w-[680px] px-4 h-full overflow-hidden">
      <div className="flex items-center justify-between w-full mb-3 px-2 shrink-0">
        <p className="text-[22px] font-medium text-(--color-1)">Today</p>

        <div className="flex items-center gap-2">
          {/*Hide Completed Task Button*/}
          <div
            className={`flex items-center justify-center cursor-pointer text-sm font-medium text-(--color-5)
                      border size-9 border-(--color-8) rounded-sm shrink-0 
                      hover:bg-(--color-9) transition-all ${hideCompletedTasks ? 'bg-(--color-9)' : ''}`}
            onClick={() => setHideCompletedTasks(!hideCompletedTasks)}
          >
            {hideCompletedTasks ? <EyeIcon size={16} weight='bold' color="#D9D9D9" /> : <EyeClosedIcon size={16} weight='bold' color="#D9D9D9" />}
          </div>

          {/*Add Task Button*/}
          <div
            className="flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-(--color-5)
                      px-3 py-2 bg-(--color-primary) hover:bg-(--color-primary)/80 rounded-sm shrink-0"
            onClick={() => setActivePanel(prev => !prev)}
          >
            <PlusIcon size={16} weight='bold' color="#D9D9D9" />
            Add Task
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <TaskAdder />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {(() => {
          const visible = tasks.filter(t => !hideCompletedTasks || !t.completed);
          if (visible.length === 0) {
            return <p className="text-md text-(--color-7) text-center px-2 py-4">No tasks left 🎉</p>;
          }
          return visible.map((t) => (
            <div key={t.id}>
              <div className="h-0 border-t border-(--color-8)/30 mx-2" />
              <Task id={t.id} completed={t.completed} title={t.title} description={t.description} dueDate={t.dueDate} tags={t.tags} />
            </div>
          ));
        })()}
      </div>

      {isEditTaskOpen && activeTask !== null && <TaskEditModal key={activeTask} />}
    </div>
  );
}