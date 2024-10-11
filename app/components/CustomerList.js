import React from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerList({ customers, onDelete }) {
  const router = useRouter();

  return (
    <ul>
      {customers.map(customer => (
        <li key={customer.id}>
          <span onClick={() => router.push(`/customers/${customer.id}`)}>
            {customer.name}
          </span>
          <button onClick={() => onDelete(customer.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
} 
