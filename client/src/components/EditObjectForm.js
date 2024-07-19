import React, { useState, useEffect } from 'react';
import './EditObjectForm.css'; // Add this import to your EditObjectForm component


const EditObjectForm = ({ object, onUpdateObject, onClose }) => {
  const [name, setName] = useState(object.name);

  useEffect(() => {
    setName(object.name);
  }, [object]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedObject = { ...object, name };
    onUpdateObject(updatedObject);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Object</h2>
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
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditObjectForm;
