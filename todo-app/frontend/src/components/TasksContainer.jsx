import TaskItem from './TaskItem';

const TasksContainer = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      ) : (
        <li className="empty-state">No tasks yet. Add one above!</li>
      )}
    </ul>
  );
};

export default TasksContainer;
