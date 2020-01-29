import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src="/assets/images/envynote.png" alt="Envy Note" />
      </Link>
    </div>
  );
}
