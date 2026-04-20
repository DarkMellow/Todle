import { useState } from "react";

import {
  SidebarSimpleIcon, CheckSquareIcon, CirclesThreeIcon, CalendarBlankIcon, ArrowUpRightIcon, SealWarningIcon, GithubLogoIcon, LinkedinLogoIcon
} from '@phosphor-icons/react';

import AddTag from "./AddTag";
import TagItem from "./TagItem";

export default function Sidebar({ tags, tasks, dispatch }) {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  return (
    <div className="flex flex-col w-[240px] shrink-0 bg-(--color-11) gap-5 border-r-2 border-r-(--color-9)">

      <div className="flex items-center justify-between gap-2 border-b-2 border-b-(--color-9) h-[55px] px-5">
        <p className="text-[21px] text-(--color-1) font-medium">Todle</p>
        <button className="cursor-pointer text-sm font-bold text-(--color-1) w-7 text-center p-1 rounded-sm shrink-0"><SidebarSimpleIcon size={24} /></button>
      </div>


      <div className="flex flex-col gap-2 px-2">
        <p className="text-xs text-(--color-7) px-3 font-bold">TASKS</p>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-3 py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
            <CheckSquareIcon size={22} color="#D9D9D9" />
            <p className="text-[14px] text-(--color-5)">Today</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
            <CirclesThreeIcon size={22} color="#D9D9D9" />
            <p className="text-[14px] text-(--color-5)">Upcoming</p>
          </div>
        </div>
      </div>

      <hr className="border-t border-(--color-9) mx-3" />

      <div className="flex flex-col gap-2 px-2">
        <p className="text-xs text-(--color-7) px-3 font-bold">CONTACTS</p>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
            <div className="flex items-center gap-2">
              <SealWarningIcon size={22} color="#D9D9D9" />
              <p className="text-[14px] text-(--color-5)">Send Feedback</p>
            </div>
            <ArrowUpRightIcon size={17} color="#A6A6A6" />
          </div>

          <div className="flex items-center justify-between px-3 py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
            <div className="flex items-center gap-2">
              <GithubLogoIcon size={22} color="#D9D9D9" />
              <p className="text-[14px] text-(--color-5)">GitHub</p>
            </div>
            <ArrowUpRightIcon size={17} color="#A6A6A6" />
          </div>

          <div className="flex items-center justify-between px-3 py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
            <div className="flex items-center gap-2">
              <LinkedinLogoIcon size={22} color="#D9D9D9" />
              <p className="text-[14px] text-(--color-5)">LinkedIn</p>
            </div>
            <ArrowUpRightIcon size={17} color="#A6A6A6" />
          </div>
        </div>
      </div>

      <hr className="border-t border-(--color-9) mx-3" />

      <div>
        <div className="flex items-center justify-between pl-5 pr-3 h-fit">
          <p className="text-xs text-(--color-7) font-bold">LABELS</p>
          <p onClick={() => setIsDeleteClicked(prev => !prev)} className="text-xs text-(--color-7) hover:text-(--color-1) p-1 px-2 font-bold cursor-pointer hover:bg-(--color-9) rounded-sm">{isDeleteClicked ? "CANCEL" : "DELETE"}</p>
        </div>

        {tags.map(tag => <div className="hover:bg-(--color-9) rounded-sm">
          <TagItem key={tag.id} tag={tag} tasks={tasks} dispatch={dispatch} isDeleteClicked={isDeleteClicked}/>
        </div>)}
        <AddTag dispatch={dispatch} />
      </div>

    </div>
  );
}
