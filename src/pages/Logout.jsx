import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("tasks");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-8 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 "
    >
      Logout
    </button>
  );
};
export default Logout;