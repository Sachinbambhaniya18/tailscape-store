import React from 'react';
import { useForm } from 'react-hook-form';

const ShippingForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Full name is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          {...register('address', { required: 'Address is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>
        <div>
          <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            {...register('pinCode', { required: 'Pin Code is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;