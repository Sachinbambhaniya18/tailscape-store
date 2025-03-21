import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard, IndianRupee } from 'lucide-react';

const PaymentForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-center px-4 py-2 border rounded-md ${
              paymentMethod === 'card'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CreditCard size={20} className="mr-2" />
            Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center justify-center px-4 py-2 border rounded-md ${
              paymentMethod === 'upi'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <IndianRupee size={20} className="mr-2" />
            UPI
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              {...register('cardNumber', { required: 'Card number is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                {...register('expiryDate', { required: 'Expiry date is required' })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                {...register('cvv', { required: 'CVV is required' })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
            </div>
          </div>
        </>
      )}

      {paymentMethod === 'upi' && (
        <div>
          <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
            UPI ID
          </label>
          <input
            type="text"
            id="upiId"
            {...register('upiId', { required: 'UPI ID is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId.message}</p>}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default PaymentForm;

