import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Dashboard del administrador
import DashboardEmployee from './components/DashboardEmployee';  // Dashboard del empleado
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard del administrador */}
        <Route path="/dashboard-employee" element={<DashboardEmployee />} />  {/* Dashboard del empleado */}
        <Route path="/register" element={<Register />} />  {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
}

export default App;
