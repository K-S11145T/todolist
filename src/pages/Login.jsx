import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      dispatch(login(username));
      localStorage.setItem("user", username);
      navigate("/todo");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back!</h2>
        
        {/* Username Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Login
        </button>

        {/* Additional Links (Optional) */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-white/70 hover:text-white transition-all">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;