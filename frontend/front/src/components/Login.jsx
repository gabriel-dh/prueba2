import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Verificar qué valor tiene data.role
    console.log('Valor de data.role:', data.role);

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);  // Guardamos el rol del usuario en localStorage

      // Verificamos el rol antes de redirigir
      if (data.role === 'admin') {
        window.location.href = '/dashboard';  
      } else if (data.role === 'employee') {
        window.location.href = '/dashboard-employee';
      }
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>

      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
}

export default Login;
