import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../router/views/Home';
import Products from '../router/views/Products';
import CartPage from '../router/views/Cart';
import Checkout from '../router/views/Checkout';
import UserDashboard from '../router/views/UserDashboard';
import AdminDashboard from '../router/views/AdminDashboard';
import VetDashboard from '../router/views/VetDashboard';
import AuthPage from '../router/user/AuthPage';
import PetsPage from '../router/views/Pets';
import ServicesPage from '../router/views/ServicePage';
import AboutPage from '../router/views/About';
import ContactPage from '../router/views/Contact';
import AppointmentsPage from '../router/views/Appointments';
import StoreAppointments from '../router/views/StoreAppointment';
import VetAppointments from '../router/views/VetAppointment';
import VeterinaryServices from '../router/views/VeterneryHospital';
import BookGovernmentHospital from '../router/views/GovernmentHospital';
import DynamicHospitalPage from '../router/views/Dynamichospital';
import BookPrivateHospital from '../router/views/PrivateHospital';
import AdminAppointmentView from '../router/views/adminappointmentssview';
import MyAppointment from '../router/views/MyAppointment';
import ProductDetails from '../router/views/ProductDetail';

const PageRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }
    if (role && user?.role !== role) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/pets" element={<PetsPage />} />
       
      {/* Restricted Public Routes */}
      {user?.role !== 'Admin' && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {
        (user?.role == "Admin" || user?.role == "Vet") && (
          <>
            <Route path="/adminappointview" element={< AdminAppointmentView/>} />
          </>
        )
      }

      {/* Protected Routes */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <AppointmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/store-appointment"
        element={
          <ProtectedRoute>
            <StoreAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vet-appointment"
        element={
          <ProtectedRoute>
            <VetAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="User">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/veterneryservice"
        element={
          <ProtectedRoute role="User">
            <VeterinaryServices/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/government-hospital"
        element={
          <ProtectedRoute role="User">
            <BookGovernmentHospital/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/private-hospital"
        element={
          <ProtectedRoute role="User">
            <BookPrivateHospital/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-appointments"
        element={
          <ProtectedRoute role="User">
            <MyAppointment/>
          </ProtectedRoute>
        }
      />
<Route path="/vet-appointment/:hospitalType" 
element={
  <ProtectedRoute role="User">
    <DynamicHospitalPage />
  </ProtectedRoute>
}/>


 
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vet-dashboard"
        element={
          <ProtectedRoute role="Vet">
            <VetDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
