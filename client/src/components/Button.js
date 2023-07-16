import React from "react";

// Maybe it is too specialized
export default function Button({className, btnType, onClick, children}) {
  return (
    <>
    <button
      className={className}
      type={btnType}
      onClick={onClick}
    >
      {children}
    </button>
    </>

  );
}
