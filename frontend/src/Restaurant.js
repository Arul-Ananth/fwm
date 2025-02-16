// src/Restaurants.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { styles } from './Theme';
import { LoadScript, GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import RestaurantDelete from './RestaurantDelete';



function Restaurants({ user }) {
  // State to store the restaurants fetched from the API
  const [restaurants, setRestaurants] = useState([]);
  // State for the restaurant selected via the search box
  const [selectedPlace, setSelectedPlace] = useState(null);
  // State for the user's current location
  const [currentLocation, setCurrentLocation] = useState(null);

  // Reference for the StandaloneSearchBox
  const searchBoxRef = useRef(null);

  // Default center (if geolocation is not available)
  const defaultCenter = { lat: 12.9718867, lng: 80.2034194 };

  // On component mount: fetch the restaurant list and get the current location
  useEffect(() => {
    fetchRestaurants();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          setCurrentLocation(defaultCenter);
        }
      );
    } else {
      setCurrentLocation(defaultCenter);
    }
  }, []);

  // Container style for the Google Map
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
    borderRadius: '8px'
  };

  // Callback when the search box loads
  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  // When a place is selected from the search suggestions
  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry && place.geometry.location) {
        const restaurant = {
          name: place.name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setSelectedPlace(restaurant);
      }
    }
  };

  // Handle adding the selected restaurant via API call
  const handleAddRestaurant = async () => {
    if (!selectedPlace) {
      alert("Please search and select a restaurant first.");
      return;
    }
    try {
      const response = await axios.post('/api/restaurant/add', selectedPlace);
      // Refresh the restaurant list after adding
      fetchRestaurants();
      alert("Restaurant added successfully!");
      setSelectedPlace(null);
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Failed to add restaurant. Please try again.");
    }
  };

  // Fetch the restaurant list from the API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('/api/restaurant/list');
      // Assuming response.data is an array of restaurant objects.
      // According to your API, the actual latitude is in the "lng" field 
      // and the actual longitude is in the "identifier" field.
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert("Failed to list restaurants. Please try again.");
    }
  };

  // Helper function to extract marker position from the API restaurant object.
  // (Actual latitude is in "lng" and longitude is in "identifier".)
  const getMarkerPosition = (restaurant) => ({
    lat: parseFloat(restaurant.lng),
    lng: parseFloat(restaurant.identifier)
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/restaurant/delete/${id}`);
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
        <p>
          Welcome, {user?.firstName} ({user?.lastName})!
        </p>
        <h2>Restaurant Finder</h2>
        <LoadScript googleMapsApiKey="AIzaSyDZh5o-Px-dZyjaOaHNCKxUZ5cbfKD5z_c" libraries={["places"]}>
          <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
              placeholder="Search for restaurants..."
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                marginBottom: '10px'
              }}
            />
          </StandaloneSearchBox>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={
              selectedPlace
                ? { lat: selectedPlace.lat, lng: selectedPlace.lng }
                : (currentLocation || defaultCenter)
            }
            zoom={selectedPlace ? 16 : 12}
          >
            {/* Markers for restaurants from the API */}
            {restaurants.map((restaurant, index) => {
              const position = getMarkerPosition(restaurant);
              return (
                <Marker
                  key={index}
                  position={position}
                  title={restaurant.name}
                />
              );
            })}
            {/* Marker for the selected restaurant (from search) */}
            {selectedPlace && (
              <Marker
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                title={selectedPlace.name}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
              />
            )}
            {/* Marker for the current browser location */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                title="Your Current Location"
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
              />
            )}
          </GoogleMap>
        </LoadScript>
        <button onClick={handleAddRestaurant} style={{ ...styles.button, marginTop: '10px' }}>
          Add Restaurant
        </button>
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Restaurant List</h3>
          {restaurants.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Name</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Coordinates</th>
                 
                </tr>
              </thead>
              <tbody>
                {restaurants.map((res, index) => {
                  const pos = getMarkerPosition(res);
                  return (
                    <tr key={index}>
                      <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{res.name}</td>
                      <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                        {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
                      </td>
                      <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No restaurants added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
