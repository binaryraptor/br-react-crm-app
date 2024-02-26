import React, { useState } from 'react';
import './UpdateEmployee.css'

const UpdateEmployeeForm = ({ id, firstName, lastName, email, onUpdate, onCancel }) => {
  const [updatedId, setUpdatedId] = useState(id);
  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);
  const [updatedEmail, setUpdatedEmail] = useState(email);

  const handleUpdate = () => {
    onUpdate({ id: updatedId, firstName: updatedFirstName, lastName: updatedLastName, email: updatedEmail });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Update Employee</h2>
        <form>
          <label>
            ID:
            <input type="text" value={updatedId} onChange={(e) => setUpdatedId(e.target.value)} />
          </label>
          <label>
            First Name:
            <input type="text" value={updatedFirstName} onChange={(e) => setUpdatedFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={updatedLastName} onChange={(e) => setUpdatedLastName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="text" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
          </label>
          <div className="button-container">
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
