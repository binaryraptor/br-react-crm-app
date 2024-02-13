import React, { useState } from 'react';

const UpdateEmployeeForm = ({ firstName, lastName, email, onUpdate, onCancel }) => {
  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);
  const [updatedEmail, setUpdatedEmail] = useState(email);

  const handleUpdate = () => {
    // Call the onUpdate function to perform the update operation
    onUpdate({ firstName: updatedFirstName, lastName: updatedLastName, email: updatedEmail });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form>
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
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
