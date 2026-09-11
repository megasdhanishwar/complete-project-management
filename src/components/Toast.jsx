import React, { useEffect } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === "success" ? <FiCheckCircle /> : <FiXCircle />}

      <span>{message}</span>
    </div>
  );
}
