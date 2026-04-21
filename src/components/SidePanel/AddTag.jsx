import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const COLORS = [
  "#E0E0E0", "#F5C518", "#00BFBF", "#FF2D9B", "#2EAF8A", "#A97FE8", "#FF6B6B", "#7ED321"
];

export default function AddTag({ dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState(COLORS[0]);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const colorPickerRef = useRef(null);

  // Close color picker on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setColorPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleAddingTag() {
    if (tagName.trim() === "") {
      alert("Tag name cannot be empty, please enter a tag name");
      return;
    }
    dispatch({ type: "ADD_TAG", payload: { name: tagName, color: tagColor } });
    setTagName("");
    setTagColor(COLORS[0]);
    setIsOpen(false);
    setColorPickerOpen(false);
  }

  return (
    <>
      {isOpen ?
        <div className="flex items-center gap-2 px-5 py-[7px] shrink-0">

          {/* Color circle + picker */}
          <div className="relative shrink-0" ref={colorPickerRef}>
            <div
              onClick={() => setColorPickerOpen(prev => !prev)}
              className="w-[17px] h-[17px] rounded-full cursor-pointer ring-2 ring-offset-1 ring-offset-(--color-11) ring-(--color-7)"
              style={{ backgroundColor: tagColor }}
            />

            {colorPickerOpen && (
              <div
                className="absolute bottom-7 left-0 z-50 bg-[#1a1a1a] rounded-lg shadow-2xl border border-(--color-9)"
                style={{ padding: "8px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 17px)", gap: "6px" }}>
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => { setTagColor(color); setColorPickerOpen(false); }}
                      style={{ width: "17px", height: "17px", backgroundColor: color, borderRadius: "4px", cursor: "pointer", border: "none", padding: 0, flexShrink: 0 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddingTag()}
            type="text"
            placeholder="Tag Name..."
            className="w-full bg-transparent text-[14px] text-(--color-5) placeholder:text-(--color-8) outline-none"
          />

          <button
            onClick={handleAddingTag}
            className="cursor-pointer text-sm font-bold text-(--color-11) bg-(--color-5) w-6 h-6 flex items-center justify-center rounded-sm shrink-0 hover:bg-(--color-1) transition-colors"
          >+</button>
        </div>
        :
        <div onClick={() => setIsOpen(prev => !prev)}>
          <div className="flex items-center gap-2 p-2 cursor-pointer px-5 hover:bg-(--color-9) hover:text-(--color-3) rounded-sm">
            <FontAwesomeIcon icon={faPlus} style={{ color: "whitesmoke" }} />
            <p className="text-[14px] text-(--color-7)">Add New Tag</p>
          </div>
        </div>}
    </>
  )
}
