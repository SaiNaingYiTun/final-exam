import React, { useState, useEffect } from 'react';

export default function CustomerForm({ customer, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
    memberNumber: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
        interests: customer.interests.join(', '), // Convert array to comma-separated string
        dateOfBirth: customer.dateOfBirth.split('T')[0], // Format date for input
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      interests: formData.interests.split(',').map(interest => interest.trim()), // Convert string to array
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Interests</label>
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Member Number</label>
        <input
          type="text"
          name="memberNumber"
          value={formData.memberNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}