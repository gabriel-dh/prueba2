import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';

function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Para editar
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Obtener lista de empleados
  const fetchEmployees = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/auth/employees', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      setEmployees(data);
    } else {
      alert('Error al obtener empleados');
    }
  };

  // Obtener registros de asistencia con filtro opcional
  const fetchAttendance = async (filters = {}) => {
    const token = localStorage.getItem('token');
    let url = 'http://localhost:3000/api/attendance/all';

    const queryParams = new URLSearchParams(filters).toString();
    if (queryParams) {
      url += `?${queryParams}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      setAttendance(data);
    } else {
      alert('Error al obtener los registros de asistencia');
    }
  };

  // Filtrar asistencia por empleado y rango de fechas
  const handleFilter = (e) => {
    e.preventDefault();
    const filters = {};
    if (employeeFilter) filters.username = employeeFilter;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    fetchAttendance(filters);
  };

  // Cargar datos del empleado en el formulario para editar
  const loadEmployeeData = (employee) => {
    setSelectedEmployee(employee);
  };

  // Eliminar empleado
  const deleteEmployee = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/auth/delete-employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Empleado eliminado');
      fetchEmployees();
    } else {
      alert('Error al eliminar empleado');
    }
  };

  return (
    <div className="container">
      <h2>Dashboard de Administración</h2>

      <div className="grid-container">
        {/* Registros de Asistencia */}
        <div>
          <h3>Filtrar Asistencia</h3>
          <form onSubmit={handleFilter}>
            <label>
              Filtrar por empleado:
              <select value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)}>
                <option value="">Seleccionar empleado</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.username}>
                    {employee.username}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha de inicio:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              Fecha de fin:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <button type="submit">Aplicar Filtro</button>
          </form>

          <h3>Registros de Asistencia</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Hora de Llegada</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td>{record.username}</td>
                  <td>{new Date(record.arrival_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gestión de Empleados */}
        <div>
          <h3>Gestión de Empleados</h3>
          <EmployeeForm selectedEmployee={selectedEmployee} fetchEmployees={fetchEmployees} />

          <h3>Lista de Empleados</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.username}</td>
                  <td>{employee.role}</td>
                  <td>
                    <button onClick={() => loadEmployeeData(employee)}>Editar</button>
                    <button className="delete" onClick={() => deleteEmployee(employee.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
