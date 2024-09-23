import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');  // Por defecto 'employee'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      window.location.href = '/';
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
