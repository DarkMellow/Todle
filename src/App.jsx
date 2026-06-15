import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Sidebar from "./components/SidePanel/Sidebar";
import SidebarClosed from "./components/SidePanel/SidebarClosed";
import TopBar from "./components/Tasks/TopBar";

import { useReducer, useState, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      tags: [1, 2],
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
    case "SET_ACTIVE_TASK":
      return { ...state, activeTask: action.payload };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activePanel, setActivePanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 950);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 950);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 950;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider value={{ tagId: state.tags.id, tasks: state.tasks, tags: state.tags, activeTask: state.activeTask, activePanel, dispatch, setActivePanel, setSidebarOpen, sidebarOpen, isEditTaskOpen, setIsEditTaskOpen }}>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden relative">
          {/* Mobile Sidebar overlay backdrop */}
          {sidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black/50 z-40 transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar container */}
          <div
            className={`h-screen z-50 transition-all duration-200 ease-in-out
              fixed md:relative inset-y-0 left-0 overflow-hidden
              ${isMobile ? "fixed inset-y-0 left-0 overflow-hidden" : "relative"}
              ${sidebarOpen 
                ? "w-[240px] translate-x-0" 
                : (isMobile ? "w-0 translate-x-[-100%]" : "w-[60px]")
              }`}
          >
            {sidebarOpen ? <Sidebar /> : <SidebarClosed />}
          </div>
          
          <div className="flex-1 h-screen flex flex-col bg-(--color-10) overflow-hidden">
            <TopBar />
            <div className="flex-1 overflow-hidden flex justify-center w-full">
              <Routes>
                <Route path="/" element={<Today />} />
                <Route path="/upcoming" element={<Upcoming />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

