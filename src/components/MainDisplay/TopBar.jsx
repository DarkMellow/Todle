import { SidebarSimpleIcon } from "@phosphor-icons/react";

import logo from "../../assets/logo.png";

export default function TopBar({ sidebarOpen }) {
  return (
    <div className="flex items-center h-[55px] p-2.5 px-5 border-b-2 border-(--color-9) w-full">
      {!sidebarOpen && <div className="flex justify-center items-center">
        <img src={logo} className="w-7 h-7 mr-2 rounded-md" alt="Todle logo" />
        <p className="text-[21px] text-(--color-1) font-medium">Todle</p>
      </div>}
    </div>
  )
}