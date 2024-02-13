import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import UpdateEmployeeform from './UpdateEmployeeform';

const CustomerList = ({ role }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [showUpdateEmployeeForm, setShowUpdateEmployeeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let API_ENDPOINT = '';
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
        if (role === 'admin' || role === 'manager' || role === 'employee') {
          API_ENDPOINT = 'http://localhost:8082/api/customers';
        }

        const response = await fetch(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }

        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [role]);

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Retrieve the access token from local storage
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      setCustomers(customers.filter(customer => customer.id !== customerId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch('http://localhost:8082/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Retrieve the access token from local storage
        },
        body: JSON.stringify({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
  
      const data = await response.json();
      setCustomers([...customers, data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:8082/api/customers/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Retrieve the access token from local storage
        },
        body: JSON.stringify(updatedEmployee),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
  
      // Update the local state with the updated employee
      const updatedCustomers = customers.map(customer => {
        if (customer.id === selectedEmployee.id) {
          return { ...customer, ...updatedEmployee };
        }
        return customer;
      });
  
      setCustomers(updatedCustomers);
      setShowUpdateEmployeeForm(false);
    } catch (error) {
      setError(error.message);
    }
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove the access token from local storage upon logout
    window.location.reload();
  };

  const toggleAddEmployeeForm = () => {
    setShowAddEmployeeForm(prevState => !prevState);
  };
  const toggleUpdateEmployeeForm = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateEmployeeForm((prev) => !prev);
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#333' }}>Welcome, {role}!</h2>
      <h3 style={{ color: '#555' }}>Customer List:</h3>
      {(role === 'admin' || role === 'manager') && (
        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }} onClick={toggleAddEmployeeForm}>Add Employee</button>
      )}
      {showAddEmployeeForm && (
        <AddEmployeeForm onAddEmployee={handleAddEmployee} onClose={toggleAddEmployeeForm} />
      )}
       {showUpdateEmployeeForm && (
        <div style={{ position: 'fixed', zIndex: '1', left: '0', top: '0', width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div style={{ backgroundColor: '#fefefe', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%', maxWidth: '600px', position: 'relative' }}>
            <span style={{ color: '#aaaaaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setShowUpdateEmployeeForm(false)}>&times;</span>
            <UpdateEmployeeform
              firstName={selectedEmployee.firstName}
              lastName={selectedEmployee.lastName}
              email={selectedEmployee.email}
              onUpdate={handleUpdateEmployee}
              onCancel={() => setShowUpdateEmployeeForm(false)}
            />
          </div>
        </div>
      )}

      <table style={{ minWidth: '600px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>First Name</th>
            <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>Last Name</th>
            <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>Email</th>
            {role === 'admin' && <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>Actions</th>}
            {role === 'manager' && <th style={{ backgroundColor: '#f0f0f0', padding: '8px', border: '1px solid #ddd' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{customer.id}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{customer.firstName}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{customer.lastName}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{customer.email}</td>
              {role === 'admin' && (
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }} onClick={() => handleDelete(customer.id)}>Delete</button>
                  <button style={{ backgroundColor: '#28a745', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => toggleUpdateEmployeeForm(customer)}>Update</button>

                </td>
              )}
               {role === 'manager' && (
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button style={{ backgroundColor: '#28a745', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => toggleUpdateEmployeeForm(customer)}>Update</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CustomerList;
