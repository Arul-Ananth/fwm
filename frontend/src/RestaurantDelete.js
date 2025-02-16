// src/RestaurantDelete.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from './Theme';

function RestaurantDelete() {
  // State to store restaurants fetched from the API
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants from the API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/api/restaurant/list');
      // Assuming each restaurant object has an 'id', 'name', 'lat', and 'lng'
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert("Failed to load restaurants. Please try again.");
    }
  };

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Handle deletion of a restaurant by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/restaurant/${id}`);
      alert("Restaurant deleted successfully!");
      // Refresh the list after deletion
      fetchRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Failed to delete restaurant. Please try again.");
    }
  };

  return (
    <div style={styles.contentContainer}>
      <div style={styles.card}>
        <h2>Restaurant Delete</h2>
        {restaurants.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Coordinates</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{restaurant.name}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                    {restaurant.lat}, {restaurant.lng}
                  </td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      style={{ ...styles.button, padding: '5px 10px', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantDelete;
