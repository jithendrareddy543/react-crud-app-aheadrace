import React, { useState } from 'react';
import './AddObjectPopup.css'; // Add this import to your AddObjectPopup component


const AddObjectPopup = ({ onAddObject, onClose }) => {
  const [name, setName] = useState('');
  const [generation, setGeneration] = useState('');
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { name }; // Prepare the object to be added
    onAddObject(newObject); // Call the function to add the object
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add New Object</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
          <label>
              Generation:
              <input
                type="text"
                value={generation}
                onChange={(e) => setGeneration(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
          <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
          <label>
              Capacity:
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddObjectPopup;
