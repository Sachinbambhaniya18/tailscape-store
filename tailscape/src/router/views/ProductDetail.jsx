import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Package, Leaf, Star, Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const AnimalIcons = {
  cat: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
      <path d="M17.5 12a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
    </svg>
  ),
  dog: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
      <path d="M9 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />
    </svg>
  ),
  bird: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  fish: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16z" />
      <path d="M12 6a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V7a1 1 0 011-1z" />
    </svg>
  ),
  other: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
      <path d="M12 6a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V7a1 1 0 011-1z" />
    </svg>
  ),
};

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const auth = useSelector((state) => state.auth);

  // Get product from navigation state
  const product = location.state?.product;

  useEffect(() => {
    // Redirect if no product data
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, Math.min(quantity + change, product.stock_quantity)));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically dispatch an action to add the review
    console.log('New review:', newReview);
    setNewReview({ rating: 0, comment: '' });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 py-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-white rounded-2xl p-8 shadow-sm">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-2xl" />
              )}
              <motion.img
                src={product.images[0] || '/placeholder.svg'}
                alt={product.name}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
                  <div className="flex items-center mb-4">
                    {renderStars(product.rating || 0)}
                    <span className="ml-2 text-gray-600">({product.reviews?.length || 0} reviews)</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
                >
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                    <Package className="w-6 h-6 text-indigo-500 mr-2" />
                    <p className="text-sm text-gray-600">Weight: {product.weight}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                    {AnimalIcons[product.pet_type.toLowerCase()] || AnimalIcons.other}
                    <p className="text-sm text-gray-600 ml-2">For: {product.pet_type}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                    <Leaf className="w-6 h-6 text-green-500 mr-2" />
                    <p className="text-sm text-gray-600">Life Stage: {product.life_stage}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex border-b mb-4">
                    <button
                      className={`py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-indigo-500' : ''}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button
                      className={`py-2 px-4 ${activeTab === 'nutrition' ? 'border-b-2 border-indigo-500' : ''}`}
                      onClick={() => setActiveTab('nutrition')}
                    >
                      Nutrition
                    </button>
                  </div>
                  {activeTab === 'description' && (
                    <p className="text-gray-600">{product.description}</p>
                  )}
                  {activeTab === 'nutrition' && product.nutritional_information && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="font-semibold mb-4">Nutritional Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.nutritional_information).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-sm text-gray-500">{key}</dt>
                            <dd className="font-medium">{value}</dd>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t pt-6"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.currency} {product.price}
                    </span>
                    {product.discount && (
                      <>
                        <span className="text-lg text-gray-400 line-through">
                          {product.currency} {product.original_price}
                        </span>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {product.discount.value}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-green-600 font-medium">
                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-200 p-2 rounded-l-md"
                    disabled={quantity === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock_quantity)))}
                    className="w-16 text-center border-t border-b border-gray-200 py-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-gray-200 p-2 rounded-r-md"
                    disabled={quantity === product.stock_quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors duration-200 ${
                    auth?.user?.role === 'Admin'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  } ${product.stock_quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                          star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
            <div className="space-y-4">
              {product.reviews && product.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-gray-600">{review.user}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;