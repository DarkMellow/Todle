import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { Tag, CalendarBlank, Check } from "@phosphor-icons/react";
import DatePickerPopover, { formatDateLabel } from "./DatePicker";

function PopOver({ handleChange, selectedTags }) {
  const { tags } = useContext(AppContext);
  return (
    <div onClick={(e) => e.stopPropagation()} className="absolute left-0 bottom-full flex flex-col bg-(--color-10) border border-(--color-8)/40 rounded-xl mb-1.5 px-2 py-2 w-40 shadow-2xl gap-2 z-30">
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

export default function TaskEditModal() {
  const { tasks, isEditTaskOpen, setIsEditTaskOpen, activeTask, dispatch, tags: allTags } = useContext(AppContext);
  const task = tasks.find(t => t.id === activeTask);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [selectedTags, setSelectedTags] = useState(task?.tags?.map(String) || []);
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : null);

  const [tagsOpen, setTagsOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const tagsRef = useRef(null);
  const dateRef = useRef(null);

  if (!task) return null;

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    dispatch({
      type: "UPDATE_TASK",
      payload: { id: activeTask, updates: { title: newTitle } }
    });
  };

  const handleDescriptionChange = (e) => {
    const newDesc = e.target.value;
    setDescription(newDesc);
    dispatch({
      type: "UPDATE_TASK",
      payload: { id: activeTask, updates: { description: newDesc } }
    });
  };

  const handleTagChange = (e) => {
    const { name, checked } = e.target;
    let newTags;
    if (checked && !selectedTags.includes(name)) {
      newTags = [...selectedTags, name];
    } else if (!checked && selectedTags.includes(name)) {
      newTags = selectedTags.filter((tag) => tag !== name);
    } else {
      return;
    }
    setSelectedTags(newTags);

    const resolvedTags = newTags.map(idStr => {
      const found = allTags.find(t => String(t.id) === idStr);
      return found ? found.id : idStr;
    });

    dispatch({
      type: "UPDATE_TASK",
      payload: { id: activeTask, updates: { tags: resolvedTags } }
    });
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setDateOpen(false);
    dispatch({
      type: "UPDATE_TASK",
      payload: { id: activeTask, updates: { dueDate: date } }
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditTaskOpen(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/75 backdrop-blur-[2px] z-50 flex flex-col justify-center items-center gap-4 px-4 transition-opacity duration-200 ${
        isEditTaskOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="text-[11px] font-bold text-(--color-7) tracking-widest uppercase">
        Click On The Properties To Edit
      </p>

      {/* First Card: Title & Description */}
      <div className="w-full max-w-[440px] bg-(--color-11) border border-(--color-8)/30 rounded-xl p-4 flex flex-col gap-3">
        <div>
          <p className="text-[11px] font-bold text-(--color-7) uppercase tracking-wider mb-1">
            Title
          </p>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Task title"
            className="bg-transparent text-sm font-semibold text-(--color-3) focus:outline-none w-full placeholder-(--color-8)"
          />
        </div>

        <div className="h-0 border-t border-(--color-8)/20" />

        <div>
          <p className="text-[11px] font-bold text-(--color-7) uppercase tracking-wider mb-1">
            Description
          </p>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add description..."
            rows={3}
            className="bg-transparent text-xs text-(--color-5) focus:outline-none w-full resize-none leading-relaxed placeholder-(--color-8)"
          />
        </div>
      </div>

      {/* Second Card: Date & Tags */}
      <div className="w-full max-w-[440px] bg-(--color-11) border border-(--color-8)/30 rounded-xl p-4 flex flex-col gap-3">
        <p className="text-[11px] font-bold text-(--color-7) uppercase tracking-wider">
          Date And Tags
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5">
            <button
              ref={tagsRef}
              onClick={() => setTagsOpen(prev => !prev)}
              className="relative flex items-center text-xs gap-1.5 text-(--color-5) bg-(--color-9) hover:bg-(--color-8)/30 border border-(--color-8)/30 rounded-full px-3 py-1.5 transition-colors cursor-pointer"
            >
              {tagsOpen && <PopOver handleChange={handleTagChange} selectedTags={selectedTags} />}
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
                          style={{
                            backgroundColor: tag.color,
                            marginLeft: i === 0 ? 0 : '-6px',
                            zIndex: selectedTags.length - i
                          }}
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
                  Add Tags
                </>
              )}
            </button>

            <button
              ref={dateRef}
              onClick={() => setDateOpen(prev => !prev)}
              className="relative flex items-center gap-1.5 text-xs text-(--color-5) bg-(--color-9) hover:bg-(--color-8)/30 border border-(--color-8)/30 rounded-full px-3 py-1.5 transition-colors cursor-pointer"
            >
              {dateOpen && <DatePickerPopover selected={dueDate} onSelect={handleDateSelect} position="top" />}
              <CalendarBlank size={14} weight={dueDate ? "fill" : "bold"} />
              {formatDateLabel(dueDate) || 'Date'}
            </button>
          </div>

          <button
            onClick={() => setIsEditTaskOpen(false)}
            className="flex items-center justify-center size-8 bg-(--color-primary) hover:bg-(--color-primary)/80 hover:scale-105 active:scale-95 text-white rounded-full cursor-pointer transition-all shadow-md shrink-0"
            title="Save and Close"
          >
            <Check size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}