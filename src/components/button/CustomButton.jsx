import React from "react";

export default function CustomButton(props) {
  return (
    <button
      type={props.type}
      style={{ backgroundColor: `${props.bgColor}` }}
      className="custom-button"
    >
      {props.text}
      {props.children}
    </button>
  );
}
