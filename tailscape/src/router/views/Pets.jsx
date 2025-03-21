import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice'; // Ensure removeFromCart exists
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/CardContent';
import { CardTitle } from '../../components/ui/CardTitle';
import { CardHeader } from '../../components/ui/CardHeader';
import { CardFooter } from '../../components/ui/CardFooter';
import Spinner from '../../components/ui/Spinner';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';
import AddPetForm from './AddPetForm';
import axios from 'axios';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // Fetch pets from the API
  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pets`);
      const data = response.data;

      if (Array.isArray(data.pet)) {
        setPets(data.pet);
      } else {
        console.error('Invalid data format: expected an array of pets');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Remove pet (DELETE request)
  const handleRemovePet = async (petId) => {
    const token = sessionStorage.getItem('token'); // Replace with actual token retrieval logic

    if (!token) {
      alert("Authorization token is missing");
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this pet?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/pets/delete/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Pet deleted successfully.');
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId)); // Update the pets state
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('An error occurred while trying to delete the pet.');
    }
  };

  // Filter and sort pets
  const filteredAndSortedPets = (Array.isArray(pets) ? pets : [])
    .filter(
      (pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'age') return a.age - b.age;
      return a.name.localeCompare(b.name);
    });

  return (
    <FadeInOnScroll>
      <div
        className={`min-h-screen ${auth?.user?.role === 'Admin'
            ? 'bg-gradient-to-b from-red-50 to-red-200'
            : 'bg-gradient-to-b from-indigo-50 to-indigo-200'
          }`}
      >
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Available Pets</h1>

          {auth?.user?.role === 'Admin' && (
            <div className="mb-8">
              <AddPetForm />
            </div>
          )}

          <div className="flex justify-between mb-6">
            <Input
              type="text"
              width="75%"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded p-2"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="age">Sort by Age</option>
            </select>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedPets.map((pet) => (
                <Card key={pet._id}>
                  <CardHeader>
                    <img
                      src={pet.images[0] || '/placeholder.svg'}
                      alt={pet.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-contain rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{pet.name}</CardTitle>
                    <p>
                      {pet.species} - {pet.breed}
                    </p>
                    <p>Age: {pet.age}</p>
                    <p className="font-bold mt-2">
                      {pet.currency} {pet.price}
                    </p>
                  </CardContent>
                  <CardFooter>
                    {auth?.user?.role === 'Admin' ? (
                      <Button
                        classes="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                        clickEvent={() => handleRemovePet(pet._id)} // Admin removes pet
                      >
                        Remove Pet
                      </Button>
                    ) : (
                      <Button
                        classes="px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
                        clickEvent={() =>
                          dispatch(
                            addToCart({
                              id: pet._id,
                              name: pet.name,
                              price: pet.price,
                              quantity: 1,
                              image: pet.images[0],
                            })
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </FadeInOnScroll>
  );
}
