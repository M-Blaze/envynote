import React from "react";

export default function ErrorTextBlock({ errorClass, errorText }) {
  return <div className={`error-text-wrap ${errorClass}`}>{errorText}</div>;
}

ErrorTextBlock.defaultProps = {
  errorClass: "empty-error-text",
  errorText: "Empty Field is not allowed"
};
