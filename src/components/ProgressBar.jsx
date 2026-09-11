import React from "react";

export default function ProgressBar({ value }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span>Progress</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
