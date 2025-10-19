import React from "react";

export const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
 <div className="modal-overlay" onClick={onClose}>
    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>
        ✕
      </button>
      {children}
    </div>
  </div>
);
