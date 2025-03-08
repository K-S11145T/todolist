import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import ProtectedRoute from "./components/ProtectedRoute";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
