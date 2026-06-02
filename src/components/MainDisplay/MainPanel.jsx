import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

import {
  EyeClosedIcon, EyeIcon,
  PlusIcon,
} from '@phosphor-icons/react';

import Task from "./Task";
import TopBar from "./TopBar";
import TaskAdder from "./TaskAdder";

export default function MainPanel() {
  const { tasks, setActivePanel } = useContext(AppContext);
  const [hideDone, setHideDone] = useState(false);

  return (
    <div className="relative flex flex-col gap-5 w-full items-center">
      <TopBar />

      <div className="flex flex-col py-[30px] w-[680px]">
        <div className="flex items-center justify-between w-full mb-3 px-2">
          <p className="text-[22px] font-medium text-(--color-1)">Today</p>

          <div className="flex items-center gap-2">
            {/*Hide Completed Task Button*/}
            <div
              className={`flex items-center justify-center cursor-pointer text-sm font-medium text-(--color-5)
                        border size-9 border-(--color-8) rounded-sm shrink-0 
                        hover:bg-(--color-9) transition-all ${hideDone ? 'bg-(--color-9)' : ''}`}
              onClick={() => setHideDone(!hideDone)}
            >
              {hideDone ? <EyeIcon size={16} weight='bold' color="#D9D9D9" /> : <EyeClosedIcon size={16} weight='bold' color="#D9D9D9" />}
            </div>

            {/*Add Task Button*/}
            <div
              className="flex items-center justify-center gap-2 cursor-pointer text-sm font-medium text-(--color-5)
                        px-3 py-2 bg-(--color-primary) hover:bg-(--color-primary)/80 transition-all rounded-sm shrink-0"
              onClick={() => setActivePanel(prev => !prev)}
            >
              <PlusIcon size={16} weight='bold' color="#D9D9D9" />
              Add Task
            </div>
          </div>
        </div>

        <TaskAdder />
        <div>
          {(() => {
            const visible = tasks.filter(t => !hideDone || !t.completed);
            if (visible.length === 0) {
              return <p className="text-md text-(--color-7) text-center px-2 py-4">No tasks left 🎉</p>;
            }
            return visible.map((t) => (
              <>
                <div key={`divider-${t.id}`} className="h-0 border-t border-(--color-8)/30 mx-2" />
                <Task key={t.id} id={t.id} completed={t.completed} title={t.title} description={t.description} dueDate={t.dueDate} tags={t.tags} />
              </>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
