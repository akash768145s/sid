import React from "react";

const SellButton = () => {
  const buttonStyle = {
    padding: "12.5px 30px",
    border: "0",
    borderRadius: "100px",
    backgroundColor: "#fff",
    color: "#004AAD",
    fontWeight: "bold",
    transition: "all 0.5s",
    WebkitTransition: "all 0.5s",
  };

  const hoverStyle = {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 20px #6fc5ff50",
    transform: "scale(1.1)",
  };

  const activeStyle = {
    transition: "all 0.25s",
    WebkitTransition: "all 0.25s",
    boxShadow: "none",
    transform: "scale(0.98)",
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  return (
    <button
      style={{
        ...buttonStyle,
        ...(isHovered ? hoverStyle : {}),
        ...(isActive ? activeStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      Sell IT!
    </button>
  );
};

export default SellButton;
