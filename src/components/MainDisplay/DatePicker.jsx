import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { addDays, nextMonday, format, isToday, isTomorrow } from "date-fns";
import { Sun, SunHorizon, ArrowRight } from "@phosphor-icons/react";

const quickOptions = [
  {
    label: "Today",
    icon: Sun,
    getDate: () => new Date(),
  },
  {
    label: "Tomorrow",
    icon: SunHorizon,
    getDate: () => addDays(new Date(), 1),
  },
  {
    label: "Next Week",
    icon: ArrowRight,
    getDate: () => nextMonday(new Date()),
  },
];

export default function DatePicker({ selected, onSelect }) {
  const handleQuickSelect = (getDate) => {
    onSelect(getDate());
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 top-full mt-1.5 z-40 bg-(--color-10) border border-(--color-8)/40 rounded-xl shadow-2xl overflow-hidden w-fit"
    >
      {/* Quick Options */}
      <div className="flex flex-col px-2 py-2">
        {quickOptions.map((opt) => {
          const date = opt.getDate();
          return (
            <button
              key={opt.label}
              onClick={() => handleQuickSelect(opt.getDate)}
              className="flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs text-(--color-5) hover:bg-(--color-8)/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <opt.icon size={17} weight="bold" />
                <span className="text-[14px]">{opt.label}</span>
              </div>
              <span className="text-(--color-7)">{format(date, "EEE")}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-0 border-t border-(--color-8)/30 mx-3" />

      {/* Calendar */}
      <div className="px-2 py-2">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={{ before: new Date() }}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function formatDateLabel(date) {
  if (!date) return null;
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "MMMM, d");
}
