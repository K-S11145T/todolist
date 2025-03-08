import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../redux/actions";

const TaskList = ({ filter,isDarkMode, filteredTasks }) => {
  const dispatch = useDispatch();
  

  const handlePriorityChange = (task, priority) => {
    dispatch(updateTask({ ...task, priority }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <ul className="space-y-4">
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          className={`group p-4 rounded-xl shadow-lg transition-all transform ${
            isDarkMode
              ? "bg-gray-800/50 hover:bg-gray-700/50 text-white"
              : "bg-zinc-200 hover:bg-zinc-100 text-zinc-800"
          } backdrop-blur-md flex flex-col md:flex-row items-center gap-4`}
        >
          <span className="flex-1">{task.text}</span>
          <select
            className={`p-3 rounded-lg outline-none transition-all ${
              isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-white"
            } ${
              task.priority === "high"
                ? "bg-gradient-to-r from-red-500  to-rose-400"
                : task.priority === "medium"
                ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                : "bg-gradient-to-r from-green-500 to-emerald-400"
            } shadow-lg`}
            value={task.priority}
            onChange={(e) => handlePriorityChange(task, e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className={`p-3 rounded-lg transition-all ${
              isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white"
                : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;