import React from "react";
import { Link } from "react-router-dom";

export default function BackHome() {
  return (
    <button type="button">
      <Link to="/">return to home page</Link>
    </button>
  );
}
