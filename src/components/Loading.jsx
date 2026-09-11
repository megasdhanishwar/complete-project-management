import React from "react";

export default function Loading() {
  return (
    <div className="state-container">
      <div className="loader" />
      <h3>Loading projects...</h3>
      <p>Please wait while we load your projects.</p>
    </div>
  );
}
