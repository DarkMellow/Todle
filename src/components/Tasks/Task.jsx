import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Check } from "@phosphor-icons/react";

export default function Task({ title, description, tags, id, completed }) {
  const { tags: allTags, dispatch, setIsEditTaskOpen } = useContext(AppContext);
  const [checked, setChecked] = useState(completed);

  function handleActiveTaskSelection() {
    dispatch({ type: "SET_ACTIVE_TASK", payload: id });
    setIsEditTaskOpen(true);
  }

  return (
    <div onClick={() => handleActiveTaskSelection()} className="flex relative flex-row gap-4 py-2 my-1 cursor-pointer hover:bg-(--color-9) transition-colors duration-150 rounded-lg px-2">
      <div
        onClick={(e) => { e.stopPropagation(); setChecked(prev => !prev); dispatch({ type: "COMPLETE_TASK", payload: id }); }}
        className={`w-5 mt-[2px] h-5 border rounded-full cursor-pointer shrink-0 flex items-center justify-center transition-colors duration-150
          ${checked ? "bg-blue-500 border-blue-500" : "border-(--color-7) bg-transparent"}`}
      >
        {checked && <Check size={12} color="white" weight="bold" />}
      </div>

      <div className="flex flex-col">
        <p className={`text-[16px] text-(--color-5) ${checked ? "line-through text-(--color-7)" : ""}`}> {title} </p>
        {description && <p className="text-sm mt-1 text-(--color-7) line-clamp-2"> {description} </p>}
        {tags.length > 0 && (
          <div className="flex gap-2 items-center mt-2 flex-wrap">
            {tags.map(tagId => {
              const tag = allTags.find(t => t.id === tagId);
              return tag ? (
                <div
                  key={tagId}
                  className={`flex items-center gap-1.5 px-2 pr-3 py-0.5 rounded-full border text-[12px] font-medium transition-colors
                    ${checked
                      ? "border-(--color-8)/20 text-(--color-7)"
                      : "border-(--color-8)/40 text-(--color-5)"
                    }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: checked ? "var(--color-7)" : tag.color }}
                  />
                  <span>{tag.name}</span>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}