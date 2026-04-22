import Sidebar from "./components/SidePanel/Sidebar";
import SidebarClosed from "./components/SidePanel/SidebarClosed";
import DetailPannel from "./components/MainDisplay/DetailPanel";
import MainPanel from "./components/MainDisplay/MainPanel";
import { useReducer, useState } from "react";

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
    { id: 1, name: "Personal", color: "#d95a00" },
    { id: 2, name: "Work", color: "#004b96" },
  ],
  activeTags: [],
  activeTask: null,
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
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activePanel, setActivePanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={"flex h-screen overflow-hidden "}>

      <div className={`h-screen transition-all duration-200 ease-in-out ${sidebarOpen ? "w-[240px]" : "w-[60px]"}`}>
        {sidebarOpen ? <Sidebar 
          tags={state.tags} 
          tasks={state.tasks} 
          dispatch={dispatch}
          setSidebarOpen={setSidebarOpen}
        /> : 
        <SidebarClosed 
          setSidebarOpen={setSidebarOpen}
        />}
      </div>

      <MainPanel
        tasks={state.tasks}
        tags={state.tags}
        setActivePanel={setActivePanel}
        dispatch={dispatch}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      
      {activePanel && <DetailPannel
        activeTask={state.activeTask}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        tags={state.tags}
        dispatch={dispatch}
      />}
    </div>
  );
}
