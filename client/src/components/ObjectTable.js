import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddObjectPopup from './AddObjectPopup'; // Import the AddObjectPopup component
import ObjectDetails from './ObjectDetails';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditObjectForm from './EditObjectForm';

const ObjectTable = () => {
  const [objects, setObjects] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [objectToDelete, setObjectToDelete] = useState(null);

  useEffect(() => {
    // Fetch the list of objects from the API
    axios.get('https://api.restful-api.dev/objects')
      .then(response => {
        setObjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching objects:', error);
      });
  }, []);

  const handleAddObject = (newObject) => {
    // Add the new object to the API
    axios.post('https://api.restful-api.dev/objects', newObject)
      .then(response => {
        // Add the new object to the list
        setObjects([...objects, response.data]);
        // Close the popup
        setIsPopupOpen(false);
      })
      .catch(error => {
        console.error('Error adding object:', error);
      });
  };

  const handleUpdateObject = (updatedObject) => {
    axios.put(`https://api.restful-api.dev/objects/${updatedObject.id}`, updatedObject)
      .then(response => {
        console.log(objects)
        // Update the object in the list
        setObjects(objects.map(obj => obj.id === response.data.id ? response.data : obj));
        // Close the edit form
        setIsEditFormOpen(false);
      })
      .catch(error => {
        console.error('Error updating object:', error);
      });
  };

  const handleDeleteObject = () => {
    if (objectToDelete) {
      axios.delete(`https://api.restful-api.dev/objects/${objectToDelete.id}`)
        .then(() => {
          // Remove the deleted object from the list
          setObjects(objects.filter(object => object.id !== objectToDelete.id));
          // Close the delete confirmation modal
          setIsDeleteModalOpen(false);
        })
        .catch(error => {
          console.error('Error deleting object:', error);
        });
    }
  };

  const handleRowClick = (object) => {
    setSelectedObject(object);
  };

  const handleOpenEditForm = (object) => {
    setSelectedObject(object);
    setIsEditFormOpen(true);
  };

  const handleOpenDeleteModal = (object) => {
    setObjectToDelete(object);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedObject(null);
  };

  return (
    <div>
      <h1>Object List</h1>
      <button onClick={() => setIsPopupOpen(true)}>Add New Object</button>
      {isPopupOpen && (
        <AddObjectPopup onAddObject={handleAddObject} onClose={() => setIsPopupOpen(false)} />
      )}
      {selectedObject && !isDeleteModalOpen && (
        <ObjectDetails object={selectedObject} onClose={handleCloseDetails} />
      )}
      {isEditFormOpen && (
        <EditObjectForm
          object={selectedObject}
          onUpdateObject={handleUpdateObject}
          onClose={() => setIsEditFormOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteObject}
          onCancel={() => setIsDeleteModalOpen(false)}
          objectName={objectToDelete ? objectToDelete.name : ''}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {objects.map(object => (
            <tr key={object.id} onClick={() => handleRowClick(object)}>
              <td>{object.id}</td>
              <td>{object.name}</td>
              <td>
                <button onClick={() => handleOpenEditForm(object)}>Edit</button>
                <button onClick={() => handleOpenDeleteModal(object)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectTable;
