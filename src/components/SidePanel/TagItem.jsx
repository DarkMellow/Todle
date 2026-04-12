
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TagItem({ tag, tasks, dispatch }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-4 h-4 rounded-sm shrink-0" style={{ backgroundColor: tag.color }}></div>

      <p className="w-full truncate">{tag.name}</p>

      <button onClick={() => dispatch({ type: "DELETE_TAG", payload: tag.id })} className="hidden group-hover:block cursor-pointer text-xs w-fit text-center p-1 rounded-sm shrink-0"><FontAwesomeIcon icon={faTrash} style={{color: "rgb(255, 5, 38)",}} /></button>

      <p className="text-xs font-bold text-gray-700 bg-[#cecece] w-7 text-center p-1 rounded-sm shrink-0">{tasks.filter(task => task.tags.includes(tag.id)).length}</p>
    </div>
  )
}