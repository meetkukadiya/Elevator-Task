import React from "react";

const Button = ({ className, onClick, id, children }) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button;
