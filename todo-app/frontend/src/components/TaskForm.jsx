const TaskForm = ({ newTask, setNewTask, handleAddTask }) => {
  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
