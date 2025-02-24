import { Task } from '../pages/HomePage';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isComplete: boolean) => void;
  onEdit: (task: Task) => void;  // Add this prop
}

export default function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit
}: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.is_complete}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="w-5 h-5"
              />
              <div>
                <h3 className={`text-lg ${task.is_complete ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}