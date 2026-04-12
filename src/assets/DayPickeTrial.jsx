import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

function DayPickerTrial() {
  const [isClicked, setIsClicked] = useState(false);
  const [date, setDate] = useState("Select Your Date");
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col">
      <div onClick={() => { setIsClicked(prev => !prev); console.log(isClicked); }} className="relative border-solid border-(--color-primary) bg-(--color-primary) cursor-pointer border-2 h-fit py-2 px-3 rounded-md w-fit flex items-center gap-3">
        <p className="text-sm">{date}</p>

        <div onClick={(e) => { e.stopPropagation(); setIsClicked(false); setDate("Select Your Date"); }} className="flex bg-(--color-primary) items-center justify-center w-6 h-6 rounded-sm">
          <FontAwesomeIcon icon={faXmark} style={{ color: "rgb(166, 32, 32)" }} />
        </div>

        {isClicked && <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 mt-2 border-2 border-(--color-secondary) w-[350px] flex flex-col p-4 rounded-md gap-1 bg-(--color-secondary)">
          <p className="cursor-pointer hover:bg-(--color-primary) p-2 rounded-md" onClick={() => { setDate("Today"); setIsClicked(false); }}>Today</p>
          
          <p className="cursor-pointer hover:bg-(--color-primary) p-2 rounded-md" onClick={() => { setDate("Tomorrow"); setIsClicked(false); }}>Tomorrow</p>

          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              if (d) {
                setSelected(d);
                setDate(format(d, "PP"));
                setIsClicked(false);
              }
            }}
          />
        </div>}
      </div>
    </div>
  );
}

export default DayPickerTrial
