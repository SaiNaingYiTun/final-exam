import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const response = await fetch(`${APIBASE}/customers`);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
    } else {
      console.error('Failed to fetch customers');
    }
  }

  async function addCustomer(data) {
    const response = await fetch(`${APIBASE}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newCustomer = await response.json();
      setCustomers([...customers, newCustomer]);
      reset();
    } else {
      console.error('Failed to add customer');
    }
  }

  async function updateCustomer(data) {
    const response = await fetch(`${APIBASE}/customers`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const updatedCustomer = await response.json();
      setCustomers(customers.map(c => (c._id === updatedCustomer._id ? updatedCustomer : c)));
      reset();
      setEditMode(false);
      setCurrentCustomer(null);
    } else {
      console.error('Failed to update customer');
    }
  }

  async function deleteCustomer(id) {
    const response = await fetch(`${APIBASE}/customers/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setCustomers(customers.filter(c => c._id !== id));
    } else {
      console.error('Failed to delete customer');
    }
  }

  function handleEdit(customer) {
    setEditMode(true);
    setCurrentCustomer(customer);
    reset(customer);
  }

  function handleFormSubmit(data) {
    if (editMode) {
      updateCustomer(data);
    } else {
      addCustomer(data);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4">
        <div className="mb-2">
          <label className="block">Name</label>
          <input
            name="name"
            type="text"
            {...register('name', { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Date of Birth</label>
          <input
            name="dateOfBirth"
            type="date"
            {...register('dateOfBirth', { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Member Number</label>
          <input
            name="memberNumber"
            type="number"
            {...register('memberNumber', { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Interests</label>
          <input
            name="interests"
            type="text"
            {...register('interests', { required: true })}
            className="border p-2 w-full"
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editMode ? 'Update' : 'Add'} Customer
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditMode(false);
                setCurrentCustomer(null);
              }}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Member Number</th>
            <th className="border p-2">Interests</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
              <td className="border p-2">{customer.memberNumber}</td>
              <td className="border p-2">{customer.interests}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;