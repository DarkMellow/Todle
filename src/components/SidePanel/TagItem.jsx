import { TrashIcon } from '@phosphor-icons/react';

export default function TagItem({ tag, tasks, dispatch, isDeleteClicked }) {
  return (
    <div className="flex items-center gap-2 px-5 py-[7px] group">
      <div className="w-[17px] h-[17px] rounded-full shrink-0" style={{ backgroundColor: tag.color }}></div>

      <p className="w-full text-[14px] truncate text-(--color-5)">{tag.name}</p>

      {isDeleteClicked && <button onClick={() => dispatch({ type: "DELETE_TAG", payload: tag.id })} className="cursor-pointer text-xs w-fit text-center p-1 rounded-sm shrink-0"><TrashIcon size={17} color="rgb(255, 5, 38)" weight='bold' /></button>}

      {/* */}
      {!isDeleteClicked && <p className="text-xs font-bold text-(--color-5) bg-(--color-9) w-6 h-6 flex items-center justify-center rounded-sm shrink-0">{tasks.filter(task => task.tags.includes(tag.id)).length}</p>}
    </div>
  )
}