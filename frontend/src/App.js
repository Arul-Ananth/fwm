// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import { styles } from './Theme';

import Upload from './Upload';
import Restaurant from './Restaurant';



// ProtectedRoute renders the children only if isAuthenticated is true.
function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  // Initialize isAuthenticated and user from localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "false";
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage when isAuthenticated changes.
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // Update localStorage when user changes.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div style={styles.globalBackground}>
      <Routes>
        <Route
          path="/"
          element={
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          }
        />
        <Route
          path="/Restaurant"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              
              <Restaurant user={user}/> 
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
