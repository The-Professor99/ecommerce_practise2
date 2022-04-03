import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="Spinner mt-3">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <h4>Loading...</h4>
    </div>
  );
}

export { Spinner };
