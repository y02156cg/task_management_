import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskUpdate from '../components/TaskUpdate';
import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
}

export default function HomePage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task: { title: string; description?: string }) => {
    try {
      const newTask: Omit<Task, 'id'> = {
        ...task,
        is_complete: false
      };
      await api.post('/tasks', newTask);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      const payload = {
        title: updatedTask.title,
        description: updatedTask.description || '',
        is_complete: updatedTask.is_complete, // Ensure correct field name
      };
  
      await api.put(`/tasks/${updatedTask.id}`, payload);
      
      setTasks(tasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...payload } : task
      ));
      
      setEditingTask(null); // Close the edit modal
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleComplete = async (id: number, isComplete: boolean) => {
    try {
      await api.put(`/tasks/${id}`, { is_complete: isComplete });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, is_complete: isComplete } : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <TaskForm onCreate={handleCreate} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onEdit={setEditingTask}
      />
      {editingTask && (
        <TaskUpdate
          task={editingTask}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}