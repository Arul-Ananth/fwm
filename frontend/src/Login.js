// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styles } from './Theme';


function Login({ setIsAuthenticated, setUser }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the /api/login endpoint with userName and password.
      const response = await axios.post('/api/login', { userName, password });
      //alert(response.data);
      // Expecting the response format: { name: "Arul", title: "Student" }
      const { firstName, lastName } = response.data;
      //alert(firstName);
      
      // Update state and localStorage with user details.
      setUser({ firstName, lastName });
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ firstName, lastName }));
      
      

      
      // Navigate to the dashboard.
      navigate('/Restaurant');
    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid userName or password');
    }
  };

  return (
    <div style={styles.contentContainer}>
      <div style={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label>User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
