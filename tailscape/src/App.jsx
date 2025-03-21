import React, { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './utilities/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageRoutes from './utilities/pageRoutes';
import { useSelector } from 'react-redux';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
    });
  }, []);

  const auth = useSelector((state) => state.auth);

  const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthRoute = location.pathname.startsWith('/auth');

    // Set theme based on user role
    const isAdmin = auth?.user?.role === 'Admin';
    const gradientClass = isAdmin
      ? 'bg-gradient-to-b from-red-50 to-red-200'
      : 'bg-gradient-to-b from-indigo-50 to-indigo-200';

    return (
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${gradientClass}`}>
        <ScrollToTop />
        {!isAuthRoute && <Header />}
        <main className="flex-grow">{children}</main>
        {!isAuthRoute && <Footer />}
      </div>
    );
  };

  return (
    <HashRouter>
      <Layout>
        <PageRoutes />
      </Layout>
    </HashRouter>
  );
}

export default App;
