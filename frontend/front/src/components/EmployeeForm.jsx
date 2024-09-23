import React, { useState, useEffect } from 'react';

function EmployeeForm({ selectedEmployee, fetchEmployees }) {
  const [employee, setEmployee] = useState({ id: '', username: '', password: '', role: 'employee' });

  // Efecto para cargar el empleado seleccionado cuando cambie
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee({
        id: selectedEmployee.id,
        username: selectedEmployee.username,
        password: '', // No mostrar la contraseña, pero se puede actualizar
        role: selectedEmployee.role,
      });
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/auth/add-update-employee', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      fetchEmployees();  // Actualizar la lista de empleados
      setEmployee({ id: '', username: '', password: '', role: 'employee' });  // Limpiar el formulario después de guardar
    } else {
      alert('Error al agregar/actualizar empleado: ' + data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={employee.id} onChange={handleChange} />

      <label>
        Nombre de usuario:
        <input
          type="text"
          name="username"
          value={employee.username}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={employee.password}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Rol:
        <select name="role" value={employee.role} onChange={handleChange}>
          <option value="employee">Empleado</option>
          <option value="admin">Administrador</option>
        </select>
      </label>

      <button type="submit">{employee.id ? 'Actualizar Empleado' : 'Agregar Empleado'}</button>
    </form>
  );
}

export default EmployeeForm;
