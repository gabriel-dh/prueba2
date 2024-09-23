import React, { useState, useEffect } from 'react';

function DashboardEmployee() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchEmployeeAttendance();
  }, []);

  // Obtener los registros de asistencia del empleado autenticado
  const fetchEmployeeAttendance = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/attendance/my-attendance', {
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

  // Registrar la llegada del empleado
  const recordArrival = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/attendance', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Llegada registrada con éxito');
      fetchEmployeeAttendance(); // Actualizar los registros después de registrar la llegada
    } else {
      alert('Error al registrar la llegada');
    }
  };

  return (
    <div className="container">
      <h2>Dashboard del Empleado</h2>
      <button onClick={recordArrival}>Registrar Llegada</button>

      <h3>Mi Registro de Asistencia</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora de Llegada</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={index}>
              <td>{new Date(record.arrival_time).toLocaleDateString()}</td>
              <td>{new Date(record.arrival_time).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardEmployee;
