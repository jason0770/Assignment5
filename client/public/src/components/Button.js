import React from "react";

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

    // <>
    // <button
    //   className={props.className}
    //   type={props.btnType}
    //   onClick={props.onClick}
    // >
    //   {props.btnName}
    // </button>
    // </>
  );
}
