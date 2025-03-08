import axios from "axios";

// Thunk action creator for fetching weather
export const fetchWeather = (city) => async (dispatch) => {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    // API success hone par action dispatch karo
    dispatch({
      type: "FETCH_WEATHER_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    // API fail hone par error action dispatch karo
    dispatch({
      type: "FETCH_WEATHER_ERROR",
      payload: error.message,
    });
  }
};


const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const login = (username) => ({
  type: "LOGIN",
  payload: username,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const addTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = [...tasks, task];
  saveTasksToLocalStorage(updatedTasks);

  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage(updatedTasks);

  return {
    type: "DELETE_TASK",
    payload: taskId,
  };
};

export const deleteAllTasks = () => {
  localStorage.removeItem("tasks"); // Clear tasks from local storage
  return {
    type: "DELETE_ALL_TASKS",
  };
};

export const updateTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((t) =>
    t.id === task.id ? { ...t, priority: task.priority } : t
  );
  saveTasksToLocalStorage(updatedTasks);

  return {
    type: "UPDATE_TASK",
    payload: task,
  };
};
