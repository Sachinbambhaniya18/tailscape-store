import React from 'react';

const OrderSummary = ({ shippingDetails, paymentDetails, cartItems, onConfirm }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 310; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <ul className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm font-medium text-gray-900">{item.currency} {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{cartItems[0]?.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Shipping</span>
            <span>{cartItems[0]?.currency} {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
            <span>Total</span>
            <span>{cartItems[0]?.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Shipping Details</h2>
        <div className="mt-4 text-sm text-gray-600">
          <p>{shippingDetails.fullName}</p>
          <p>{shippingDetails.address}</p>
          <p>{shippingDetails.city}, {shippingDetails.pinCode}</p>
          <p>{shippingDetails.phone}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
        <div className="mt-4 text-sm text-gray-600">
          {paymentDetails.cardNumber ? (
            <p>Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
          ) : (
            <p>UPI ID: {paymentDetails.upiId}</p>
          )}
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;

