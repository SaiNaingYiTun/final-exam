'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/CustomerForm';

export default function CustomerDetailPage({ params }) {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      // Fetch customer details from API
      fetch(`/api/customers/${id}`)
        .then(response => response.json())
        .then(data => setCustomer(data));
    }
  }, [id]);

  const handleSubmit = (updatedCustomer) => {
    // Update customer in API
    fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCustomer),
    }).then(() => router.push('/customers'));
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer Details</h1>
      <CustomerForm customer={customer} onSubmit={handleSubmit} />
    </div>
  );
} 
