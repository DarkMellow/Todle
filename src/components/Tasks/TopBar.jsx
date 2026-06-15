import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { List } from "@phosphor-icons/react";

import logo from "../../assets/logo.png";

export default function TopBar() {
  const { sidebarOpen, setSidebarOpen } = useContext(AppContext);
  return (
    <div className="flex items-center h-[55px] p-2.5 px-5 border-b-2 border-(--color-9) w-full gap-3.5">
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="cursor-pointer text-(--color-5) hover:text-white p-1 rounded-sm shrink-0 flex items-center justify-center transition-colors"
          title="Open sidebar"
        >
          <List size={22} />
        </button>
      )}
      {!sidebarOpen && (
        <div className="flex items-center">
          <img src={logo} className="w-7 h-7 mr-2 rounded-md" alt="Todle logo" />
          <p className="text-[21px] text-(--color-1) font-medium">Todle</p>
        </div>
      )}
    </div>
  )
}