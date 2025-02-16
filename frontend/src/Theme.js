// src/Theme.js

export const styles = {
    globalBackground: {
      backgroundImage:
        "url(https://via.placeholder.com/1200x800?text=Global+Background)", // Replace with your image URL
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "100vh",
      backdropFilter: "blur(8px)", // Adds a blur effect for better readability
    },
    card: {
      width: "90%",
      maxWidth: "400px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ddd",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    error: {
      color: "red",
    },
    message: {
      marginTop: "15px",
      fontWeight: "bold",
      color: "#28a745",
    },
  };
  