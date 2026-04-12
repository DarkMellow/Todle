import { useState } from "react";
import { Check } from "@phosphor-icons/react";

export default function Task({ title }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-row gap-4 items-center border-t border-gray-200 py-2">
      <div
        onClick={() => setChecked(prev => !prev)}
        className={`w-4 h-4 border rounded-sm cursor-pointer shrink-0 flex items-center justify-center transition-colors duration-150
          ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"}`}
      >
        {checked && <Check size={16} color="white" weight="bold" />}
      </div>
      <p className={`text-lg font-medium transition-colors duration-150 ${checked ? "line-through text-gray-400" : ""}`}>
        {title}
      </p>
    </div>
  );
}