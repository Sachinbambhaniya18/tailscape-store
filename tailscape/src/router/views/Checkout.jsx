import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import components (we'll create these next)
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import ConfirmationStep from '../../components/checkout/ConfirmationStep';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const cartItems = useSelector((state) => state.cart.items);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
    handleNext();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentDetails(data);
    handleNext();
  };

  const handleConfirmOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order confirmed', { shippingDetails, paymentDetails, items: cartItems });
    handleNext();
  };

  const steps = [
    { title: 'Shipping', component: <ShippingForm onSubmit={handleShippingSubmit} /> },
    { title: 'Payment', component: <PaymentForm onSubmit={handlePaymentSubmit} /> },
    { title: 'Review', component: <OrderSummary shippingDetails={shippingDetails} paymentDetails={paymentDetails} cartItems={cartItems} onConfirm={handleConfirmOrder} /> },
    { title: 'Confirmation', component: <ConfirmationStep /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s.title}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-24 border-t border-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[step - 1].component}
        </motion.div>
        <div className="mt-8 flex justify-between">
          {step > 1 && step < steps.length && (
            <button
              onClick={handlePrev}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChevronLeft size={16} className="mr-2" />
              Previous
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ml-auto"
            >
              Next
              <ChevronRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

