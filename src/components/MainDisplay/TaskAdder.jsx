import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Tag, CalendarBlank } from "@phosphor-icons/react";
import DatePickerPopover, { formatDateLabel } from "./DatePicker";

function PopOver({ handleChange, selectedTags }) {
  const { tags } = useContext(AppContext);
  return (
    <div onClick={(e) => e.stopPropagation()} className="absolute left-0 top-full flex flex-col bg-(--color-10) border border-(--color-8)/40 rounded-xl mt-1.5 px-2 py-2 w-40 shadow-2xl gap-2 z-30">
      {tags.map(tag => (
        <label key={tag.id} htmlFor={String(tag.id)} className="hover:bg-(--color-8)/20 flex items-center gap-1.5 text-xs text-(--color-5) rounded-md px-2 py-1.5 transition-colors cursor-pointer">
          <input type="checkbox" checked={selectedTags.includes(String(tag.id))} className="custom-checkbox" name={String(tag.id)} id={String(tag.id)} onChange={handleChange} />
          <Tag size={14} weight="fill" color={tag.color} />
          {tag.name}
        </label>
      ))}
    </div>
  );
}


export default function TaskAdder() {
  const { activePanel, setActivePanel, dispatch, tags: allTags } = useContext(AppContext);
  const [tagsOpen, setTagsOpen] = useState(false);                 // To control visibility of tag popover
  const [selectedTags, setSelectedTags] = useState([]);            // Tags that are selected for adding new task
  const [dateOpen, setDateOpen] = useState(false);                 // To control visibility of date picker
  const [dueDate, setDueDate] = useState(null);                    // Selected due date

  const [title, setTitle] = useState('');                          // Task title
  const [description, setDescription] = useState('');              // Task description

  const tagsRef = useRef(null);
  const dateRef = useRef(null);

  const handleChange = (e) => {                                    // For handling tag selected changes
    const { name, checked } = e.target;
    if (checked && !selectedTags.includes(name)) {
      setSelectedTags((prev) => [...prev, name]);
    } else if (!checked && selectedTags.includes(name)) {
      setSelectedTags((prev) => prev.filter((tag) => tag !== name));
    }
  }

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setDueDate(null);
    setTagsOpen(false);
    setDateOpen(false);
    setActivePanel(false);
  };

  const saveTask = () => {
    if (title.trim() === '') {
      alert("Please enter a task title");
      return;
    }
    const resolvedTags = selectedTags.map(idStr => {
      const found = allTags.find(t => String(t.id) === idStr);
      return found ? found.id : idStr;
    });
    const newTask = { id: crypto.randomUUID(), title, description, tags: resolvedTags, dueDate, completed: false };
    dispatch({ type: "ADD_TASK", payload: newTask });
    resetForm();
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (tagsRef.current && !tagsRef.current.contains(e.target)) {
        setTagsOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full max-w-[680px] mx-auto bg-(--color-9) rounded-xl z-20 mb-5 ${activePanel ? '' : 'hidden'}`}>
      <div className="flex flex-col gap-3 py-2 px-3">
        <div className="flex flex-col py-2 px-1 gap-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="What is your task..." className="w-full rounded-sm text-(--color-1) bg-(--color-9) focus:outline-none focus:ring-0" />

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add description..." className="w-full h-10 resize-none text-sm rounded-sm text-(--color-6) bg-(--color-9) focus:outline-none focus:ring-0"></textarea>
        </div>

        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="flex items-center gap-2">
            <button ref={tagsRef} onClick={() => setTagsOpen(prev => !prev)} className="relative flex items-center text-xs gap-1.5 text-(--color-5) bg-(--color-8)/40 rounded-2xl px-3 py-1.5 hover:bg-(--color-8)/40 transition-colors cursor-pointer">
              {tagsOpen && <PopOver handleChange={handleChange} selectedTags={selectedTags} setTagsOpen={setTagsOpen} />}
              {selectedTags.length > 0 ? (
                <>
                  <div className="flex items-center">
                    {selectedTags.map((idStr, i) => {
                      const tag = allTags.find(t => String(t.id) === idStr);
                      if (!tag) return null;
                      return (
                        <span
                          key={tag.id}
                          className="size-4 rounded-full border-2 border-(--color-9)/80 shrink-0"
                          style={{ backgroundColor: tag.color, marginLeft: i === 0 ? 0 : '-6px', zIndex: selectedTags.length - i }}
                        />
                      );
                    })}
                  </div>
                  <Tag size={14} weight="regular" />
                  {selectedTags.length}
                </>
              ) : (
                <>
                  <Tag size={14} weight="regular" />
                  Add Tag
                </>
              )}
            </button>

            <button ref={dateRef} onClick={() => setDateOpen(prev => !prev)} className="relative flex items-center gap-1.5 text-xs text-(--color-5) bg-(--color-8)/40 rounded-2xl px-3 py-1.5 hover:bg-(--color-8)/40 transition-colors cursor-pointer">
              {dateOpen && <DatePickerPopover selected={dueDate} onSelect={(date) => { setDueDate(date); setDateOpen(false); }} />}
              <CalendarBlank size={14} weight={dueDate ? "fill" : "bold"} />
              {formatDateLabel(dueDate) || 'Date'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={resetForm} className="text-xs text-(--color-5) bg-(--color-8)/40 rounded-2xl px-4 py-1.5 hover:bg-(--color-8)/40 transition-colors cursor-pointer">
              Cancel
            </button>

            <button onClick={saveTask} className="text-xs text-white bg-(--color-primary)/90 hover:bg-(--color-primary) transition-colors cursor-pointer rounded-2xl px-4 py-1.5">
              Save Task
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
