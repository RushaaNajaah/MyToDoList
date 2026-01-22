const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className="group flex items-start gap-4">
           
            <button 
                onClick={() => onToggle(task.id)}
                className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all
                    ${task.is_completed 
                        ? 'bg-indigo-600 border-indigo-600' 
                        : 'border-gray-300 hover:border-indigo-400'}`}
            >
                {task.is_completed && (
                    <div className="w-full h-full flex items-center justify-center text-white text-xs">
                        ✓
                    </div>
                )}
            </button>

            
            <div className="flex flex-col">
                <span className={`text-xl ${task.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                </span>
                
                
                {task.due_date && (
                    <span className="text-orange-800 text-sm opacity-80">
                        {task.due_date}
                    </span>
                )}
            </div>

           
            <button 
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 text-xs ml-4 mt-2"
            >
                Supprimer
            </button>
        </div>
    );
};
export default TaskItem;