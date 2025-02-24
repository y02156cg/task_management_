import { useState } from 'react';
import { Task } from '../pages/HomePage';
interface TaskUpdateProps {
task: Task;
onUpdate: (task: Task) => void;
onCancel: () => void;
}
export default function TaskUpdate({ task, onUpdate, onCancel }: TaskUpdateProps) {
const [title, setTitle] = useState(task.title);
const [description, setDescription] = useState(task.description || '');
const [isComplete, setIsComplete] = useState(task.is_complete);
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
onUpdate({
 ...task,
title,
description,
is_complete: isComplete
 });
 };
return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
<h2 className="text-2xl font-bold mb-4">Update Task</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Task title"
required
className="w-full p-2 border rounded"
/>
</div>
<div>
<input
type="text"
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description (optional)"
className="w-full p-2 border rounded"
/>
</div>
<div className="flex items-center">
<input
type="checkbox"
checked={isComplete}
onChange={(e) => setIsComplete(e.target.checked)}
className="w-5 h-5"
/>
<span className="ml-2">Completed</span>
</div>
<div className="flex justify-end space-x-2 pt-4">
<button
type="button"
onClick={onCancel}
className="px-4 py-2 border rounded hover:bg-gray-100"
>
 Cancel
</button>
<button
type="submit"
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
 Update Task
</button>
</div>
</form>
</div>
</div>
 );
}