import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<ProtectedRoute><ToDo /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
