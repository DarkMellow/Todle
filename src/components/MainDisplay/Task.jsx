import { useState } from "react";
import { Check, CalendarBlank, Tag } from "@phosphor-icons/react";

export default function Task({ title, description, tags, allTags }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-row gap-4 border-t border-(--color-9) py-2">
      <div
        onClick={() => setChecked(prev => !prev)}
        className={`w-4 mt-[6px] h-4 border rounded-full cursor-pointer shrink-0 flex items-center justify-center transition-colors duration-150
          ${checked ? "bg-blue-500 border-blue-500" : "border-(--color-7) bg-transparent"}`}
      >
        {checked && <Check size={28} color="white" weight="bold" />}
      </div>

      <div className="flex flex-col">
        <p className={`text-lg font-medium text-(--color-4) ${checked ? "line-through text-(--color-7)" : ""}`}> {title} </p>
        <p className="text-sm mt-1 text-(--color-7)"> {description} </p>
        <div className="flex gap-4 items-center mt-1">
          {tags.map(tagId => {
            const tag = allTags.find(t => t.id === tagId);
            return tag ? (
              <div key={tagId} className="flex gap-1 items-center">
                <Tag size={14} weight="bold" color={tag.color} />
                <p className="text-sm" style={{ color: tag.color }}>{tag.name}</p>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}