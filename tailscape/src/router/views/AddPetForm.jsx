import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function AddPetForm() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    price: '',
    currency: '',
    images: [], // To store uploaded image files
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        images: [file],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images' && formData.images[0]) {
        formDataToSend.append(key, formData.images[0]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/pets`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setFormData({
          name: '',
          species: '',
          breed: '',
          age: '',
          price: '',
          currency: '',
          images: [],
        });
      } else {
        console.error('Failed to add pet');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-lg space-y-4 border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Add New Pet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet Name"
          required
        />
        <Input
          name="species"
          value={formData.species}
          onChange={handleChange}
          placeholder="Species"
          required
        />
        <Input
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed"
          required
        />
        <Input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
          required
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
        />
        <Input
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          placeholder="Currency (e.g., USD)"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>
      <Button
        type="submit"
        classes="w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
      >
        Add Pet
      </Button>
    </form>
  );
}

