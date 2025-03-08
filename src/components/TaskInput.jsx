import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, deleteAllTasks } from "../redux/actions";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim() !== "") {
      dispatch(addTask({ id: Date.now(), text: task, priority: "low" }));
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDeleteAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      dispatch(deleteAllTasks());
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={handleAddTask}
        className="px-6 py-2 md:py-0 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/20 font-medium"
      >
        Add Task
      </button>
      <button
        onClick={handleDeleteAllTasks}
        className="px-6 py-2 md:py-0 rounded-lg bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500 transition-all shadow-lg shadow-red-500/20 font-medium"
      >
        Clear All
      </button>
    </div>
  );
};

export default TaskInput;