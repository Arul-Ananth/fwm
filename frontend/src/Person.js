// src/Person.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Person() {
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);

  // This useEffect will run once when the component mounts
  useEffect(() => {
    async function fetchPerson() {
      try {
        const response = await axios.get('api/person');
        setPerson(response.data);
      } catch (err) {
        console.error('Error fetching person data:', err);        
        setError(err.message);
      }
    }
    fetchPerson();
  }, []); // Empty dependency array means this effect runs on page load

  return (
    <div style={{ padding: '20px' }}>
      <h2>Person Info</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {person ? (
        <div>
          <p>
            <strong>Name:</strong> {person.name}
          </p>
          <p>
            <strong>Title:</strong> {person.title}
          </p>
        </div>
      ) : (
        <p>Loading person data...</p>
      )}
    </div>
  );
}

export default Person;
