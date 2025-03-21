import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiAward, FiUsers } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <main className="container mx-auto">
        <motion.h1 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold text-center text-indigo-800 mb-12"
        >
          About TailScape
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <img
              src="https://plus.unsplash.com/premium_photo-1675791190312-7028ade21944?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="TailScape Team"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              TailScape was founded in 2024 with a simple mission: to provide the best care and
              products for pets and their owners. Our passion for animals drives everything we do,
              from selecting the highest quality products to offering expert advice and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that pets are family, and they deserve the very best. That's why we work
              tirelessly to source eco-friendly, sustainable, and innovative products that enhance
              the lives of pets and their owners.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team of experienced pet lovers is always here to help you find the perfect
              solution for your furry, feathered, or scaly friend. We're more than just a platform
              - we're your partners in pet care.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={fadeIn} 
          initial="hidden" 
          animate="visible" 
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FiHeart className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Passionate Care</h3>
            <p className="text-gray-600">
              We treat every pet as if it were our own, ensuring the highest quality of care.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FiAward className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Quality Products</h3>
            <p className="text-gray-600">
              We curate only the best products to keep your pets healthy and happy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FiUsers className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Community Focus</h3>
            <p className="text-gray-600">
              We're building a community of pet lovers, sharing knowledge and experiences.
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
