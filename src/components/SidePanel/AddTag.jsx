import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function AddTag({ dispatch }) {
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
        <div className="flex items-center gap-2 px-5 py-[7px] shrink-0">
          <div className="w-[17px] h-[17px] rounded-full shrink-0" style={{ backgroundColor: tagColor }}></div>

          <input value={tagName} onChange={(e) => setTagName(e.target.value)} type="text" placeholder="Tag Name..." className="w-full bg-transparent text-(--color-5)" />

          <button onClick={handleAddingTag} className="cursor-pointer text-sm font-bold text-gray-700 bg-[#cecece] w-6 h-6 flex items-center justify-center rounded-sm shrink-0">+</button>
        </div>
        :
        <div onClick={() => setIsOpen(prev => !prev)}>
          <div className="flex items-center gap-2 p-2 cursor-pointer px-5 hover:bg-(--color-9) hover:text-(--color-3) rounded-sm">
            <FontAwesomeIcon icon={faPlus} style={{ color: "whitesmoke", }} />
            <p className="text-[14px] text-(--color-7)">Add New Tag</p>
          </div>
        </div>}
    </>
  )
}
