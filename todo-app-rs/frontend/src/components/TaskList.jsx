import { useState, useEffect } from 'react';
import { 
  getCsrfToken,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from '../api/tasksApi';
import TaskForm from './TaskForm';
import TasksContainer from './TasksContainer';
import './TaskList.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
	const initialize = async () => {
	    try {
		await getCsrfToken();
		const tasks = await fetchTasks();
		setTasks(tasks);
	    } catch (err) {
		setError(err.response?.data?.message || 'Failed to load tasks');
	    } finally {
		setLoading(false);
	    }
	};
	initialize();
    }, []);
    
    const handleAddTask = async (e) => {
	e.preventDefault();
	if (!newTask.trim()) return;
	
	try {
	    const task = await createTask(newTask);
	    setTasks([task, ...tasks]);
	    setNewTask('');
	} catch (err) {
	    setError(err.response?.data?.message || 'Failed to add task');
	}
    };
    
    const handleToggleTask = async (taskId) => {
	try {
	    const task = tasks.find(t => t.id === taskId);
	    await updateTask(taskId, {
		title: task.title,  
		completed: !task.completed
	    });  
	    setTasks(tasks.map(t => 
		t.id === taskId ? {...t, completed: !t.completed} : t
	    ));
	} catch (err) {
	    console.error("Update failed:", err);
	    setError("Failed to update task");
	}
    };
    
    const handleDeleteTask = async (taskId) => {
	try {
	    await deleteTask(taskId);
	    setTasks(tasks.filter(t => t.id !== taskId));
	} catch (err) {
	    setError(err.response?.data?.message || 'Failed to delete task');
	}
    };
    
    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container error">{error}</div>;
    
    return (
	<div className="container">
	    <h1>Minimal To-Do</h1>
	    <TaskForm 
		newTask={newTask}
		setNewTask={setNewTask}
		handleAddTask={handleAddTask}
	    />
	    <TasksContainer 
		tasks={tasks}
		onToggle={handleToggleTask}
		onDelete={handleDeleteTask}
	    />
	</div>
    );
};

export default App;
