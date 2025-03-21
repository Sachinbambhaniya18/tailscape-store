import { Link } from 'react-router-dom';
import { PawPrint, Stethoscope } from 'lucide-react';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';

export default function AppointmentsPage() {
  return (
    <FadeInOnScroll>
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Book Your Pet Appointment
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full mx-auto mb-4">
                  <PawPrint className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                  Visit Our Pet Store
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Book an appointment to visit our store and find your perfect pet companion.
                </p>
                <Link
                  to="/store-appointment"
                  className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
                >
                  Book Store Visit
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                  Veterinary Services
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Schedule a veterinary appointment for your pet's health, care,
                  and well-being.
                </p>
                <Link
                  to="/veterneryservice"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
                >
                  Book Vet Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}
