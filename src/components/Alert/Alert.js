import './main.css';
import React, { useEffect } from "react";

const Alert = ({ message, variant, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000); // Automatically close after 3 seconds
    return () => clearTimeout(timeout);
  }, [onClose]);

  const alertStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: variant === "success" ? "#4CAF50" : "#F44336",
    color: "white",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    animation: "slideIn 0.3s ease-out",
    zIndex: 1000,
  };

  return (
    <div style={alertStyles}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
