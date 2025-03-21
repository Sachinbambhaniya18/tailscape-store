import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const auth = useSelector((state) => state.auth);

  // Determine theme based on user role
  const isAdmin = auth.user?.role === 'Admin';
  const isVet = auth.user?.role === 'Vet';
  const theme = isAdmin ? 'from-red-700 to-red-500' : 
                isVet ? 'from-green-700 to-green-500' : 'from-indigo-700 to-indigo-500';

  return (
    <footer className={`bg-gradient-to-t ${theme} text-white shadow-md py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">TailScape</h3>
            <p className="text-sm">
              Your trusted partner in pet care and products.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex justify-center w-full md:w-auto">
            <ul className="space-x-5 flex justify-left md:justify-start">
              <li>
                <NavLink to="/products" className="text-sm hover:text-indigo-300">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-sm hover:text-indigo-300">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-sm hover:text-indigo-300">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-sm hover:text-indigo-300">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex justify-center space-x-6">
              <NavLink to="#" className="text-2xl hover:text-indigo-300">
                <FaFacebook />
              </NavLink>
              <NavLink to="#" className="text-2xl hover:text-indigo-300">
                <FaTwitter />
              </NavLink>
              <NavLink to="#" className="text-2xl hover:text-indigo-300">
                <FaInstagram />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>&copy; 2024 TailScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
