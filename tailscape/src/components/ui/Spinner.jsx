import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ color }) => {
  const colorClasses = {
    red: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
    indigo: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
    green: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  };

  const outerRingColor = colorClasses[color] || 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600';
  const innerRingColor = `bg-${color}-300`;

  return (
    <div className="flex justify-center items-center h-64" role="status" aria-label="Loading">
      <div className="relative w-12 h-12">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 rounded-full ${outerRingColor}`}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{
              scale: [0, 1, 1],
              opacity: [0.7, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.6,
              ease: 'easeInOut',
            }}
          />
        ))}
        <div className={`absolute inset-0 rounded-full ${innerRingColor} opacity-30`} />
      </div>
    </div>
  );
};

export default Spinner;