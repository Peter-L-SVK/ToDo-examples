import { FiTrash2, FiCircle, FiCheckCircle } from 'react-icons/fi';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button 
        className="toggle-btn"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? <FiCheckCircle /> : <FiCircle />}
      </button>
      <span className="task-title">{task.title}</span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <FiTrash2 />
      </button>
    </li>
  );
};

export default TaskItem;
