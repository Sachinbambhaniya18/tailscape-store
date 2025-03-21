import React from 'react'
import { useSelector } from 'react-redux';

const VetDashboard = () => {
    const user = useSelector((state) => state.auth.user);

  if (!user || user.role !== 'Vet') {
    return <div>Access denied. Vet privileges required.</div>;
  }
  
  return (
    <div>VetDashboard</div>
  )
}

export default VetDashboard