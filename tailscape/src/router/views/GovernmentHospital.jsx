import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookGovernmentHospital() {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [governmentHospitals, setGovernmentHospitals] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vetHospitals/government');
        const data = await response.json();
        setGovernmentHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedHospital(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedHospitalData = governmentHospitals.find(
      (hospital) => hospital.name === selectedHospital
    );

    if (selectedHospitalData) {
      alert(`You have successfully booked ${selectedHospital}`);
      navigate(selectedHospitalData.path);
    }
  };

  const getHospitalRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '✰' : '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100/80 px-4 py-12 relative overflow-hidden">
      <main className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Book Government Hospital</h1>
        <p className="text-center text-gray-600 mb-8">
          Select a government hospital from the dropdown to proceed with your booking.
        </p>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow-lg rounded-lg p-8 mt-6 max-w-lg mx-auto transition-all duration-300 hover:shadow-xl"
        >
          <div className="mb-6">
            <label htmlFor="hospital" className="block text-gray-700 font-medium mb-2">
              Select a Hospital
            </label>
            <select
              id="hospital"
              className="w-full border border-gray-300 rounded-md p-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedHospital}
              onChange={handleDropdownChange}
              required
            >
              <option value="" disabled>
                -- Select a Hospital --
              </option>
              {governmentHospitals.map((hospital, index) => (
                <option key={index} value={hospital.name}>
                  {hospital.name} ({getHospitalRatingStars(hospital.rating)})
                </option>
              ))}
            </select>
          </div>

          {selectedHospital && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedHospital}{' '}
                <span className="text-sm font-normal text-gray-500">
                  ({getHospitalRatingStars(
                    governmentHospitals.find((h) => h.name === selectedHospital)?.rating
                  )})
                </span>
              </h2>
              <p className="text-gray-600">
                {governmentHospitals.find((h) => h.name === selectedHospital)?.description}
              </p>
              <p className="text-gray-600">
                Location:{' '}
                <span className="text-blue-600">
                  {governmentHospitals.find((h) => h.name === selectedHospital)?.location}
                </span>
              </p>
              <p className="text-gray-600">
                Timings:{' '}
                <span className="text-gray-800">
                  {governmentHospitals.find((h) => h.name === selectedHospital)?.timings}
                </span>
              </p>
              <p className="text-gray-600">
                Phone Number:{' '}
                <span className="text-gray-800">
                  {governmentHospitals.find((h) => h.name === selectedHospital)?.phone}
                </span>
              </p>
              <a
                href={governmentHospitals.find((h) => h.name === selectedHospital)?.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline mt-2 block"
              >
                View on Google Maps
              </a>
              {governmentHospitals.find((h) => h.name === selectedHospital)?.website && (
                <a
                  href={governmentHospitals.find((h) => h.name === selectedHospital)?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline mt-2 block"
                >
                  Visit Website
                </a>
              )}
            </div>
          )}

        

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
}
