import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FaDog, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const handleProfileClick = () => {
    if (auth.user?.role === 'Admin') {
      navigate('/admin');
    } else if (auth.user?.role === 'User') {
      navigate('/dashboard');
    } else if (auth.user?.role === 'Vet') {
      navigate('/vet-dashboard');
    } else {
      navigate('/auth');
    }
  };

  const isAdmin = auth.user?.role === 'Admin';
  const isVet = auth.user?.role === 'Vet';
  const isUser = auth.user?.role === 'User';
  const theme = isAdmin
    ? 'from-red-700 to-red-500'
    : isVet
    ? 'from-green-700 to-green-500'
    : 'from-indigo-700 to-indigo-500';

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`sticky top-0 bg-gradient-to-t ${theme} text-white shadow-md z-50`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 text-2xl font-bold tracking-wide cursor-pointer hover:text-gray-300 transition duration-200"
          onClick={handleLogoClick}
        >
          <FaDog className="text-3xl" />
          <span>TailScape</span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            {/* Navigation for Unauthenticated Users */}
            {!auth.isAuthenticated && (
              <>
                <li>
                  <NavLink to="/" className="hover:text-gray-300 transition duration-200">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className="hover:text-gray-300 transition duration-200">
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-gray-300 transition duration-200">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="hover:text-gray-300 transition duration-200">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pets" className="hover:text-gray-300 transition duration-200">
                    Pets
                  </NavLink>
                </li>
              </>
            )}

            {/* User Navigation */}
            {isUser && auth.isAuthenticated && (
              <>
                <li>
                  <NavLink to="/" className="hover:text-gray-300 transition duration-200">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className="hover:text-gray-300 transition duration-200">
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-gray-300 transition duration-200">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="hover:text-gray-300 transition duration-200">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pets" className="hover:text-gray-300 transition duration-200">
                    Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/appointments" className="hover:text-gray-300 transition duration-200">
                    Appointments
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Navigation */}
            {isAdmin && auth.isAuthenticated && (
              <>
                <li>
                  <NavLink to="/pets" className="hover:text-gray-300 transition duration-200">
                    Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="hover:text-gray-300 transition duration-200">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adminappointview" className="hover:text-gray-300 transition duration-200">
                    Appointments
                  </NavLink>
                </li>
              </>
            )}

            {/* Vet Navigation */}
            {isVet && auth.isAuthenticated && (
              <li>
                <NavLink to="/adminappointview" className="hover:text-gray-300 transition duration-200">
                  Appointments
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Cart and User Links */}
        <div className="flex items-center space-x-6">
          {/* Shopping Cart Link */}
          {!isAdmin && !isVet && (
            <NavLink
              to="/cart"
              className="group relative flex items-center p-2 hover:bg-white rounded-md transition duration-200"
            >
              <FaShoppingCart className="text-2xl group-hover:text-black transition duration-200" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </NavLink>
          )}

          {/* User Authentication/Navigation */}
          {auth.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* User Profile Link */}
              <button
                onClick={handleProfileClick}
                className="group flex items-center p-2 hover:bg-white rounded-md transition duration-200"
              >
                <FaUser className="text-xl mr-2 group-hover:text-black transition duration-200" />
                <span className="text-lg font-medium group-hover:text-black">
                  {auth.user?.name}
                </span>
              </button>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className="group flex items-center p-2 hover:bg-white rounded-md transition duration-200"
            >
              <FaUser className="text-xl mr-2 group-hover:text-black transition duration-200" />
              <span className="text-lg font-medium group-hover:text-black">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
