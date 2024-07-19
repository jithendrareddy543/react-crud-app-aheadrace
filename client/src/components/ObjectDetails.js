import React from 'react';
import './ObjectDetails.css'; // Add this import to your ObjectDetails component


const ObjectDetails = ({ object, onClose }) => {
  return (
    <div className="details-overlay">
      <div className="details-content">
        <h2>Object Details</h2>
        <p><strong>ID:</strong> {object.id}</p>
        <p><strong>Name:</strong> {object.name}</p>
        {/* Add more details here if available */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ObjectDetails;
