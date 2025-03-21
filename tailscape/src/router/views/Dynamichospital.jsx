import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VetAppointment from '../views/VetAppointment';

export default function DynamicHospitalPage() {
  const { hospitalType } = useParams(); // Assume route param: /vet-appointment/:hospitalType
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the hospital data from the API
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctor');
        const data = await response.json();
        setLoading(false);
        
        // Filter the fetched data based on hospitalType
        const selectedDoctors = data.filter((hospital) =>
          hospital.vetHospital.path.toLowerCase().includes(hospitalType.toLowerCase())
        );

        if (selectedDoctors.length > 0) {
          setHospitalData({
            type :hospitalType.toLowerCase(),
            doctors:selectedDoctors
          });
        } else {
          setHospitalData({
            type: 'Unknown Hospital',
            doctors: [],
          });
        }
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch hospital data');
      }
    };

    fetchHospitalData();
  }, [hospitalType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <VetAppointment
      hospitalType={hospitalData.type}
      doctors={hospitalData.doctors}
    />
  );
}
