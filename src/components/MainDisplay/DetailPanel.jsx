import { useState, useEffect, useRef } from "react";

export default function DetailPanel({ activePanel, setActivePanel, tags }) {
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedTags = tags.filter(t => selectedTagIds.includes(t.id));
  const availableTags = tags.filter(t => !selectedTagIds.includes(t.id));

  function addTag(tagId) {
    setSelectedTagIds(prev => [...prev, tagId]);
    setDropdownOpen(false);
  }

  function removeTag(tagId) {
    setSelectedTagIds(prev => prev.filter(id => id !== tagId));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    activePanel && (
      <div className="p-4 bg-(--color-11) my-6 mr-6 rounded-lg flex flex-col justify-between border border-(--color-9)">
        <div>
          <p className="text-[32px] tracking-tight font-bold mb-6 text-(--color-1)">Task</p>
          <input type="text" placeholder="Write your task here" className="w-full border border-(--color-8) bg-(--color-9) text-(--color-4) placeholder:text-(--color-7) p-2 mb-4 rounded-sm" />
          <textarea placeholder="Description of your task" className="w-full border h-20 border-(--color-8) bg-(--color-9) text-(--color-4) placeholder:text-(--color-7) rounded-sm p-2 mb-6 resize-none" />

          {/* Deadline row */}
          <div className="flex gap-4 items-center mb-6">
            <p className="font-medium text-(--color-5) w-24 shrink-0">Deadline :</p>
            <input type="date" className="border border-(--color-8) bg-(--color-9) text-(--color-4) p-2 rounded-sm" />
          </div>

          {/* Tags row */}
          <div className="flex gap-4 items-center mb-6 ">
            <p className="font-medium text-(--color-5) w-24 shrink-0">Tags :</p>
            <div className="flex flex-wrap gap-2 items-center relative" ref={dropdownRef}>
              {/* Chips for selected tags */}
              {selectedTags.map(tag => (
                <span key={tag.id} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-white shrink-0" style={{ backgroundColor: tag.color }}>
                  {tag.name}
                  <button onClick={() => removeTag(tag.id)} className="cursor-pointer ml-1 leading-none">×</button>
                </span>
              ))}

              {/* Dropdown trigger button */}
              <div className="relative">
                <button onClick={() => setDropdownOpen(prev => !prev)} className="cursor-pointer text-sm font-bold text-(--color-4) bg-(--color-8) w-7 h-7 rounded-sm flex items-center justify-center">+</button>

                {/* Dropdown list */}
                {dropdownOpen && (
                  <div className="absolute top-8 left-0 bg-(--color-10) border border-(--color-8) rounded-md shadow-lg z-10 min-w-36">
                    {availableTags.length === 0 ? (
                      <p className="text-xs text-(--color-7) p-3">No more tags</p>
                    ) : (
                      availableTags.map(tag => (
                        <button key={tag.id} onClick={() => addTag(tag.id)} className="cursor-pointer flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-(--color-9) text-(--color-4) text-sm">
                          <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: tag.color }}></span>
                          {tag.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <button onClick={() => setActivePanel(false)} className="cursor-pointer text-sm font-bold text-(--color-5) border py-2 border-(--color-8) text-center p-1 rounded-sm w-full hover:bg-(--color-9) transition-colors">Cancel</button>
          <button onClick={() => setActivePanel(false)} className="cursor-pointer text-sm font-bold text-(--color-11) bg-amber-400 py-2 text-center p-1 rounded-sm w-full hover:bg-amber-300 transition-colors">Save</button>
        </div>
      </div>
    )
  );
}
