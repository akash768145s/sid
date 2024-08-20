import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css"; // Import the modal CSS

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-confirm">
            Yes
          </button>
          <button onClick={onClose} className="btn-cancel">
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
