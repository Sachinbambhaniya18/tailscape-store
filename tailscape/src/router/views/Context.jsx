import React, { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentTime, setNewAppointmentTime] = useState('');
  const [newPetType, setNewPetType] = useState('Dog');
  const [newBreed, setNewBreed] = useState('');

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      date: newAppointmentDate,
      time: newAppointmentTime,
      status: 'pending',
      petType: newPetType,
      breed: newBreed,
      doctor: selectedDoctor.name,
    };
    setAppointments([...appointments, newAppointment]);
    setNewAppointmentDate('');
    setNewAppointmentTime('');
    setNewPetType('Dog');
    setNewBreed('');
    setSelectedDoctor(null);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        selectedDoctor,
        setSelectedDoctor,
        newAppointmentDate,
        setNewAppointmentDate,
        newAppointmentTime,
        setNewAppointmentTime,
        newPetType,
        setNewPetType,
        newBreed,
        setNewBreed,
        handleBookAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
