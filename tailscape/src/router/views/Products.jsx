import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';
import AddPetProduct from './AddPetProduct';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  product,
  isAdmin,
  onNavigate,
  onProductRemoved,
  onAddToCart,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemoveProduct = async (e) => {
    e.stopPropagation();
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert("Authorization token is missing");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${product.name}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`Product ${product.name} has been successfully deleted.`);
        onProductRemoved(product._id); // Notify parent to update state
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while trying to delete the product.");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product); // Trigger the callback for adding the product to the cart
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
      onClick={() => onNavigate(product)}
    >
      <div className="relative w-full h-48">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">
          {product.currency} {product.price}
        </p>
        <Button
          clickEvent={isAdmin ? handleRemoveProduct : handleAddToCart}
          classes={`w-full ${
            isAdmin
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-indigo-500 hover:bg-indigo-600'
          } text-white py-2 rounded transition-colors duration-300`}
        >
          {isAdmin ? 'Remove' : 'Add to Cart'}
        </Button>
      </div>
    </motion.div>
  );
};


const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
      const fetchedProducts = response.data.products;

      const uniqueCategories = [
        'All',
        ...new Set(fetchedProducts.map((product) => product.pet_type)),
      ];

      setProducts(fetchedProducts);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductRemoved = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  const handleNavigate = (product) => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  const sortedAndFilteredProducts = products
    .filter((product) => filterCategory === 'All' || product.pet_type === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <FadeInOnScroll>
      <div
        className={`container mx-auto px-4 py-8 ${
          auth?.user?.role === 'Admin'
            ? 'bg-gradient-to-b from-red-50 to-red-200'
            : 'bg-gradient-to-b from-indigo-50 to-indigo-200'
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {auth?.user?.role === 'Admin' && (
          <div className="mb-8">
            <AddPetProduct />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                buttonKey={category}
                clickEvent={() => setFilterCategory(category)}
                classes={`px-4 py-2 rounded-md transition-all duration-200 shadow-sm ${
                  filterCategory === category
                    ? auth?.user?.role === 'Admin'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : auth?.user?.role === 'Admin'
                    ? 'bg-red-200 text-red-800 hover:bg-red-300'
                    : 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-gray-400 transition duration-200"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {loading ? (
          <Spinner
            color={
              auth?.user?.role === 'Admin'
                ? 'red'
                : auth?.user?.role === 'User'
                ? 'indigo'
                : 'green'
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isAdmin={auth?.user?.role === 'Admin'}
                onNavigate={handleNavigate}
                onProductRemoved={handleProductRemoved} // Pass the callback here
              />
            ))}
          </div>
        )}
      </div>
    </FadeInOnScroll>
  );
};

export default Products;