import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConfirmationStep = () => {
  return (
    <div className="text-center">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been received and is being processed.</p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ConfirmationStep;

