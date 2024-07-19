import React from 'react';
import './ConfirmDeleteModal.css'; // Add this import to your ConfirmDeleteModal component


const ConfirmDeleteModal = ({ onConfirm, onCancel, objectName }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete "{objectName}"?</p>
        <button onClick={onConfirm}>Yes, Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
