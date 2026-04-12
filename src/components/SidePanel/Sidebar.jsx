import { useState } from "react";
import TagItem from "./TagItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

function AddTag({ dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("New Tag");
  const [tagColor, setTagColor] = useState("#ffffff");

  function handleAddingTag() {
    dispatch({ type: "ADD_TAG", payload: { name: tagName, color: tagColor } });
    setTagName("New Tag");
    setTagColor("#ffffff");
    setIsOpen(prev => !prev);
  }

  return (
    <>
      {isOpen ?
        <div className="flex items-center gap-2 p-2 shrink-0">
          <input value={tagColor} onChange={(e) => setTagColor(e.target.value)} type="color" className="w-6 h-6 rounded-md" />
          <input value={tagName} onChange={(e) => setTagName(e.target.value)} type="text" placeholder="Tag Name" className="w-full" />
          <button onClick={handleAddingTag} className="cursor-pointer text-sm font-bold text-gray-700 bg-[#cecece] w-7 text-center p-1 rounded-sm shrink-0">+</button>
        </div> :
        <div onClick={() => setIsOpen(prev => !prev)}>
          <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#f0f0f0] rounded-sm">
            <FontAwesomeIcon icon={faPlus} style={{ color: "rgb(32, 80, 166)", }} />
            <p>Add New Tag</p>
          </div>
        </div>}
    </>
  )
}

export default function Sidebar({ tags, tasks, dispatch }) {
  return (
    <div className="w-[350px] shrink-0 p-4 bg-(--color-secondary)">
      <div>
        <p className="text-xs text-gray-700 font-bold mt-5 mb-3">TASKS</p>
        <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#f0f0f0] rounded-sm">
          <FontAwesomeIcon icon={faListCheck} style={{ color: "#505050" }} />
          <p>Today's Goals</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-700 font-bold mt-5 mb-3">LISTS </p>
        {tags.map(tag => <div className="hover:bg-[#f0f0f0] rounded-sm p-2">
          <TagItem key={tag.id} tag={tag} tasks={tasks} dispatch={dispatch} />
        </div>)}
      </div>

      <AddTag dispatch={dispatch} />
    </div>
  );
}
