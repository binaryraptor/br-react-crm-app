import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import UpdateEmployeeform from './UpdateEmployeeform';
import axios from 'axios';
import './CustomerList.css'; 

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
        const accessToken = localStorage.getItem('accessToken');         if (role === 'admin' || role === 'manager' || role === 'employee') {
          API_ENDPOINT = 'http://localhost:8082/api/customers';
        }

        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch customer data');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [role]);

  const handleDelete = async (customerId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(`http://localhost:8082/api/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to delete customer');
      }

      setCustomers(customers.filter(customer => customer.id !== customerId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8082/api/customers', newEmployee, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to add employee');
      }

      setCustomers([...customers, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(`http://localhost:8082/api/customers`, updatedEmployee, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update employee');
      }

      const updatedCustomers = customers.map(customer => {
        if (customer.id === updatedEmployee.id) {
          return updatedEmployee;
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
    localStorage.removeItem('accessToken'); 
    window.location.reload();
  };

  const toggleAddEmployeeForm = () => {
    setShowAddEmployeeForm(prevState => !prevState);
  };

  const toggleUpdateEmployeeForm = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateEmployeeForm(prevState => !prevState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customer-list-container">
      <h2 className="heading">Welcome, {role}!</h2>
      <h3 className="sub-heading">Customer List:</h3>
      {(role === 'admin' || role === 'manager') && (
        <button className="button" onClick={toggleAddEmployeeForm}>Add Customer ++</button>
      )}
      {showAddEmployeeForm && <AddEmployeeForm onAddEmployee={handleAddEmployee} onClose={toggleAddEmployeeForm} />}
      {showUpdateEmployeeForm && (
        <UpdateEmployeeform
          firstName={selectedEmployee.firstName}
          lastName={selectedEmployee.lastName}
          email={selectedEmployee.email}
          id={selectedEmployee.id}
          onUpdate={handleUpdateEmployee}
          onCancel={() => setShowUpdateEmployeeForm(false)}
        />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {role === 'admin' && <th>Actions</th>}
            {role === 'manager' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              {role === 'admin' && (
                <td>
                  <button className="delete-button" onClick={() => handleDelete(customer.id)}>Delete</button>
                  <button className="update-button" onClick={() => toggleUpdateEmployeeForm(customer)}>Update</button>
                </td>
              )}
              {role === 'manager' && (
                <td>
                  <button className="update-button" onClick={() => toggleUpdateEmployeeForm(customer)}>Update</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CustomerList;
