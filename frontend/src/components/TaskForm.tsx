import { useState } from 'react';
interface TaskFormProps {
onCreate: (task: { title: string; description?: string | undefined }) => void;
}
export default function TaskForm({ onCreate }: TaskFormProps) {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
onCreate({ title, description });
setTitle('');
setDescription('');
 };
return (
<form onSubmit={handleSubmit} className="mb-8">
<div className="flex gap-4">
<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Task title"
required
className="flex-1 p-2 border rounded"
/>
<input
type="text"
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description (optional)"
className="flex-1 p-2 border rounded"
/>
<button
type="submit"
className="bg-blue-500 text-white px-4 py-2 rounded"
>
 Add Task
</button>
</div>
</form>
 );
}