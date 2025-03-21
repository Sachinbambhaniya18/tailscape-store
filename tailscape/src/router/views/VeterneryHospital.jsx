import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, AmbulanceIcon as FirstAid, Clock, Wallet, Award, Users, HeartPulse, Stethoscope, Calendar } from 'lucide-react';

export default function VeterinaryServices() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100/80 px-4 py-12">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Veterinary Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the best healthcare option for your beloved pet. We partner with both government and private facilities to ensure quality care for all.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Government Hospital Card */}
          <Link to="/government-hospital" className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group">
            <div className="text-center p-6">
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <FirstAid className="h-10 w-10 text-white" />
                </div>
                <span className="absolute top-0 right-0 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Government Certified
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Government Hospital
              </h2>
              <p className="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                Access affordable and reliable pet healthcare at government facilities with standardized pricing and qualified professionals.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">24/7 Emergency</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                  <Wallet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Subsidized Rates</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                  <HeartPulse className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Basic Care</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">All Pets Welcome</span>
                </div>
              </div>

              <div 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
              >
                Book Government Hospital
              </div>
            </div>
          </Link>

          {/* Private Hospital Card */}
          <Link to="/private-hospital" className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group">
            <div className="text-center p-6">
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <span className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Premium Care
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                Private Hospital
              </h2>
              <p className="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                Experience premium pet healthcare with state-of-the-art facilities and personalized attention from specialist veterinarians.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-green-500 transition-colors duration-300">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Flexible Hours</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-green-500 transition-colors duration-300">
                  <Award className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Specialist Care</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-green-500 transition-colors duration-300">
                  <Building2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Modern Facility</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-green-500 transition-colors duration-300">
                  <HeartPulse className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced Care</span>
                </div>
              </div>

              <div 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
              >
                Book Private Hospital
              </div>
            </div>
          </Link>

          {/* My Appointments Card */}
          <Link to="/my-appointments" className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group">
            <div className="text-center p-6">
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <span className="absolute top-0 right-0 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Manage Visits
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                My Appointments
              </h2>
              <p className="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors duration-300">
                View and manage all your pet's upcoming and past appointments conveniently in one place.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-purple-500 transition-colors duration-300">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Upcoming Visits</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-purple-500 transition-colors duration-300">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Appointment History</span>
                </div>
              </div>

              <div 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
              >
                View Appointments
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
