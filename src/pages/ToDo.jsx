import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/actions";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Logout from "../pages/Logout";

const ToDo = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.tasks.weather);
  const error = useSelector((state) => state.tasks.error);
  const [city, setCity] = useState("Delhi");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  const tasks = useSelector((state) => state.tasks.tasks);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [filter, setFilter] = useState("all");

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleDeleteAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      dispatch(deleteAllTasks());
    }
  };

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

  const handlePriorityChange = (task, priority) => {
    dispatch(updateTask({ ...task, priority }));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "important") return task.priority === "high";
    if (filter === "planned") return task.priority === "medium";
    return false;
  });

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-100 to-white"} text-white`}>
      {/* Sidebar */}
      <aside className={`w-full md:w-1/4 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} p-6 backdrop-blur-lg shadow-xl`}>
        <div>
          <div className="flex gap-6 items-center mb-8">
            <div className="relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt="Profile"
                className="rounded-full w-[70px] bg-zinc-300 h-[70px] object-cover shadow-lg ring-4 ring-green-500/80"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Hey, {user}
              </h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Welcome back!</p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {isDarkMode ? (
                <i className="ri-sun-line text-xl text-yellow-500"></i>
              ) : (
                <i className="ri-moon-line text-xl text-gray-700"></i>
              )}
            </button>
          </div>

          <nav className="space-y-3 mb-8">
            {["all", "important", "planned"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 ${
                  filter === filterType
                    ? `${isDarkMode ? "bg-gradient-to-r from-green-600 to-green-500" : "bg-gradient-to-r from-green-500 to-emerald-400"} shadow-lg shadow-green-500/20`
                    : `${isDarkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-zinc-800"}`
                }`}
              >
                <i className={`ri-${filterType === "all" ? "list-check" : filterType === "important" ? "star-line" : "calendar-line"} text-xl`}></i>
                <span className="capitalize">{filterType} Tasks</span>
              </button>
            ))}
          </nav>

          <div className={`p-4 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-700/50 text-white" : "bg-zinc-200 text-zinc-800"} backdrop-blur-md`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="ri-cloud-line text-blue-400"></i>
              Weather in {city}
            </h2>
            
            {error && <p className="text-red-500">{error}</p>}

            {weather ? (
              <div className="space-y-2">
                <p className="text-3xl font-bold">{weather.current.temp_c}°C</p>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{weather.current.condition.text}</p>
              </div>
            ) : (
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-12 bg-gray-600 rounded-full"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            )}

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="flex-1 px-2 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => dispatch(fetchWeather(city))}
                className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/20"
              >
                <i className="ri-search-line"></i>
              </button>
            </div>
          </div>
        </div>

        <Logout />
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4 md:p-8">
        <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDarkMode ? "bg-gray-800/50" : "bg-white"} backdrop-blur-md`}>
          <TaskInput />
        </div>
        <TaskList filter={filter} filteredTasks={filteredTasks} />
      </main>
    </div>
  );
};

export default ToDo;