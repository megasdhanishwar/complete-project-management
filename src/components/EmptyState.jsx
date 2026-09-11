import React from "react";
import { FiFolder } from "react-icons/fi";

export default function EmptyState({
  title = "No projects found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="state-container">
      <div className="state-icon">
        <FiFolder />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}
