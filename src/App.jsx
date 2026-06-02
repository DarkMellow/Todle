import Sidebar from "./components/SidePanel/Sidebar";
import SidebarClosed from "./components/SidePanel/SidebarClosed";

import MainPanel from "./components/MainDisplay/MainPanel";
import { useReducer, useState } from "react";
import { AppContext } from "./context/AppContext";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Buy groceries",
      description: "We need to buy dogfood, catfood, and some stuffs like mangos and spices for the kitchen",
      tags: [1],
      completed: false,
    },
    {
      id: 2,
      title: "Finish report",
      description: "",
      tags: [1,2],
      completed: false,
    },
    {
      id: 3,
      title: "Call dentist",
      description: "",
      tags: [2],
      completed: false,
    },
  ],
  tags: [
    { id: 1, name: "Personal", color: "#FF6B6B" },
    { id: 2, name: "Work", color: "#A97FE8" },
  ],
  activeTags: [],     // toggle to see the tasks related only to this specific tag
  activeTask: null,   // which task is currently active
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, { ...action.payload, id: crypto.randomUUID() }],
      };
    case "DELETE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      };
    case "COMPLETE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activePanel, setActivePanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppContext.Provider value={{ tagId: state.tags.id, tasks: state.tasks, tags: state.tags, activeTask: state.activeTask, activePanel, dispatch, setActivePanel, setSidebarOpen, sidebarOpen }}>
    <div className={"flex h-screen overflow-hidden "}>

      <div className={`h-screen transition-all duration-200 ease-in-out ${sidebarOpen ? "w-[240px]" : "w-[60px]"}`}>
        {sidebarOpen ? <Sidebar /> : <SidebarClosed />}
      </div>

      <MainPanel />
      

    </div>
    </AppContext.Provider>
  );
}

