import React from "react";

export default function Button(props) {
  return (
    <button className="custom-button">
      {props.text}
      {props.children}
    </button>
  );
}
