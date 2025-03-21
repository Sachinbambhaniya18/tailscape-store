import React, { useState, useEffect } from 'react';
import { CalendarIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { PawPrint, Dog, Cat, Bird } from 'lucide-react';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';
import { useSelector } from 'react-redux';
export default function MyAppointmentPage() {
const auth = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const petIcons = {
    dog: Dog,
    cat: Cat,
    bird: Bird,
    other: PawPrint,
  };

   const getStatusIcon = (status) => {
      switch (status) {
        case 'approved':
          return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
        case 'denied':
          return <XCircleIcon className="w-6 h-6 text-red-500" />;
        default:
          return <ClockIcon className="w-6 h-6 text-yellow-500" />;
      }
    };
 const [loading, setLoading] = useState(true); // To track the loading state
  useEffect(() => {
    // Fetch appointments from the API
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctorAppointments/doctor-appointments/${auth.user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data.appointments); // Assuming the response has an 'appointments' field
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };
    
    fetchAppointments();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <FadeInOnScroll>
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 flex items-center justify-center">
            <PawPrint className="w-12 h-12 mr-4 text-blue-600" />
            Veterinary Appointments 
          </h1>

          

          <div className="bg-white shadow-lg rounded-lg overflow-hidden border-4 border-blue-200">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl leading-6 font-medium text-blue-900 mb-4 flex items-center">
                <ClockIcon className="w-6 h-6 mr-2 text-blue-500" />
                Your Upcoming Visits
              </h2>
              <ul className="divide-y divide-gray-200">
                {appointments.map((appointment) => {
                  const PetIcon = petIcons[appointment.petType.toLowerCase()];
                  return (
                    <li key={appointment.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {PetIcon && (
                          <PetIcon className="h-6 w-6 text-blue-500 mr-3" aria-hidden="true" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}{' '}
                          at {appointment.time} - {appointment.petType} ({appointment.breed}) with{' '}
                          {appointment.doctor.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'denied'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        <div className="ml-2">{getStatusIcon(appointment.status)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}