 'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerList from '@/components/CustomerList';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch customers from API
    fetch('/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data));
  }, []);

  const handleDelete = (id) => {
    // Delete customer from API
    fetch(`/api/customers/${id}`, { method: 'DELETE' })
      .then(() => setCustomers(customers.filter(customer => customer.id !== id)));
  };

  return (
    <div>
      <h1>Customers</h1>
      <button onClick={() => router.push('/customers/add')}>Add New Customer</button>
      <CustomerList customers={customers} onDelete={handleDelete} />
    </div>
  );
}
