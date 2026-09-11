import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorState({ message }) {
  return (
    <div className="state-container error-state">
      <div className="state-icon">
        <FiAlertTriangle />
      </div>

      <h3>Something went wrong</h3>

      <p>{message}</p>
    </div>
  );
}
