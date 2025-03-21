import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDog, FaCat, FaFish, FaFeather } from 'react-icons/fa';
import CategoryCard from '../../components/CategoryCard';
import Spinner from '../../components/ui/Spinner';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';
import { addToCart } from '../../store/cartSlice';
import axios from 'axios'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
        
        const shuffled = response.data.products.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        setProducts(selected);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <FadeInOnScroll>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-200">
        <main>
          
          <section className="relative h-[45vh]">
            <img
              src="happy-pet-owner.jpg"
              alt="Happy pets and owners"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  Welcome to TailScape
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl">
                  Your one-stop shop for all pet needs
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 px-6 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Featured Products
            </h2>
            {loading ? (
              <Spinner color = {
                auth?.user?.role === 'Admin' 
                          ? 'red' : 
                            auth?.user?.role === 'User' ? 'indigo' : 'green'
              }/>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                  >
                    <img
                      src={product.images[0] || '/placeholder.svg?height=200&width=200'}
                      alt={product.name}
                      className="w-full h-56 object-contain transition-opacity duration-300"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-xl font-bold text-indigo-600">
                        {product.currency} {product.price}
                      </p>
                      <button
                        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md w-full hover:bg-indigo-700 transition duration-200"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: product._id,
                              name: product.name,
                              price: product.price,
                              currency: product.currency,
                              image: product.images[0],
                            })
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="py-16 px-6 bg-indigo-50">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <CategoryCard name="Dogs" icon={<FaDog className="text-4xl text-indigo-600" />} />
              <CategoryCard name="Cats" icon={<FaCat className="text-4xl text-yellow-600" />} />
              <CategoryCard name="Fish" icon={<FaFish className="text-4xl text-green-600" />} />
              <CategoryCard name="Birds" icon={<FaFeather className="text-4xl text-purple-600" />} />
            </div>
          </section>

          <section className="py-16 px-6 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Special Offers</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              <div className="flex-none w-72 h-40 bg-indigo-200 rounded-lg flex items-center justify-center shadow-lg">
                <p className="text-xl font-semibold text-gray-900">20% Off Dog Toys</p>
              </div>
              <div className="flex-none w-72 h-40 bg-yellow-200 rounded-lg flex items-center justify-center shadow-lg">
                <p className="text-xl font-semibold text-gray-900">Free Cat Food Sample</p>
              </div>
              <div className="flex-none w-72 h-40 bg-green-200 rounded-lg flex items-center justify-center shadow-lg">
                <p className="text-xl font-semibold text-gray-900">Buy 2 Get 1 Free on Fish Food</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </FadeInOnScroll>
  );
}