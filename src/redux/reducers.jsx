import { combineReducers } from "redux";

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

const initialTaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [], // LocalStorage se tasks fetch karo
  weather: null,
  error: null,
  isDarkMode: localStorage.getItem("theme") === "dark", // Dark mode bhi fetch karo
};


const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
      case "FETCH_WEATHER_SUCCESS":
        return {
          ...state,
          weather: action.payload,
          error: null,
        };
      case "FETCH_WEATHER_ERROR":
        return {
          ...state,
          weather: null,
          error: action.payload,
        };
      default:
        return state;
  }
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

export default rootReducer;
