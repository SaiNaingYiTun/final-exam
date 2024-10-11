import React from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/CustomerForm';

export default function AddCustomerPage() {
  const router = useRouter();

  const handleSubmit = (customer) => {
    // Add customer to API
    fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    }).then(() => router.push('/customers'));
  };

  return (
    <div>
      <h1>Add New Customer</h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}