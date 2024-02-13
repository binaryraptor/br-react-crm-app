import React, { useState } from 'react';

const AddEmployeeForm = ({ onAddEmployee, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee({ firstName, lastName, email });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '0px', borderRadius: '5px', maxWidth: '500px' }}>
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Add</button>
            <button type="button" onClick={onClose} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
