import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 310; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-8">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">{item.currency} {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-indigo-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-indigo-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{cartItems[0]?.currency} {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{cartItems[0]?.currency} {shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg text-gray-800">
                      <span>Total</span>
                      <span>{cartItems[0]?.currency} {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="mt-8 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
