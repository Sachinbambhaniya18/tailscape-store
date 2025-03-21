import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiCalendar } from 'react-icons/fi';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/CardContent';
import { CardTitle } from '../../components/ui/CardTitle';
import { CardHeader } from '../../components/ui/CardHeader';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Welcome to TailScape</h2>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
          <Button 
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
          >
            Log In
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          Welcome, {user?.name}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-indigo-100 p-4">
                <CardTitle className="flex items-center text-xl font-bold text-indigo-800">
                  <FiUser className="mr-2" /> Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-2"><strong>Name:</strong> {user?.name}</p>
                <p className="text-gray-600 mb-4"><strong>Email:</strong> {user?.email}</p>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-green-100 p-4">
                <CardTitle className="flex items-center text-xl font-bold text-green-800">
                  Your Pets
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4">You haven't added any pets yet.</p>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300">
                  Add a Pet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-yellow-100 p-4">
                <CardTitle className="flex items-center text-xl font-bold text-yellow-800">
                  <FiShoppingBag className="mr-2" /> Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={cardVariants} initial="hidden" animate="visible">
            <Card className="h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-purple-100 p-4">
                <CardTitle className="flex items-center text-xl font-bold text-purple-800">
                  <FiCalendar className="mr-2" /> Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4">You don't have any upcoming appointments.</p>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
                  Book an Appointment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
