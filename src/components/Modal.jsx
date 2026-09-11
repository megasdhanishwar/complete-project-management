import React from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
