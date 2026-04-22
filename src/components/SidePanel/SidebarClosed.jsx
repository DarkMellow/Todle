import {
  SidebarSimpleIcon, CheckSquareIcon, CirclesThreeIcon, SealWarningIcon, GithubLogoIcon, LinkedinLogoIcon
} from '@phosphor-icons/react';

export default function SidebarClosed({ setSidebarOpen }) {
  return (
    <div className="flex flex-col h-full w-[60px] shrink-0 bg-(--color-10) gap-5 border-r-2 border-r-(--color-9)">

      {/* Header */}
      <div className="flex items-center justify-center border-b-2  border-b-(--color-9) h-[55px]">
        <button onClick={() => setSidebarOpen(true)} className="cursor-pointer text-(--color-1) p-1 rounded-sm">
          <SidebarSimpleIcon size={24} />
        </button>
      </div>

      {/* Tasks icons */}
      <div className="flex flex-col gap-1 mx-2.5 items-center">
        <div className="flex items-center justify-center w-full py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
          <CheckSquareIcon size={22} color="#D9D9D9" />
        </div>
        <div className="flex items-center justify-center w-full py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
          <CirclesThreeIcon size={22} color="#D9D9D9" />
        </div>
      </div>

      <hr className="border-t border-(--color-9) mx-3" />

      {/* Contact icons */}
      <div className="flex flex-col gap-1 mx-2.5 items-center">
        <div className="flex items-center justify-center w-full py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
          <SealWarningIcon size={22} color="#D9D9D9" />
        </div>
        <div className="flex items-center justify-center w-full py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
          <GithubLogoIcon size={22} color="#D9D9D9" />
        </div>
        <div className="flex items-center justify-center w-full py-[7px] cursor-pointer hover:bg-(--color-9) rounded-sm">
          <LinkedinLogoIcon size={22} color="#D9D9D9" />
        </div>
      </div>

    </div>
  );
}
