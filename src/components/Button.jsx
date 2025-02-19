import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  onClick,
  disabled = false,
  className,
  type = "button",
}) => {
  if (type === "link") {
    return (
      <Link
        to={disabled ? "#" : to}
        className={`btn ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  } else if (type === "button") {
    return (
      <button
        disabled={disabled}
        className={`btn ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
