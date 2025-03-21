import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function AddPetProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    brand: "",
    petType: "",
    lifeStage: "",
    ingredients: [],
    nutritionalInformation: { protein: "", fat: "", fiber: "" },
    price: "",
    quantity: "",
    currency: "",
    discountType: "",
    discountValue: "",
    weight: "",
    allergens: [],
    images: [],
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ingredients" || name === "allergens") {
      setFormData((prev) => ({ ...prev, [name]: value.split(",").map((i) => i.trim()) }));
    } else if (name.startsWith("nutritionalInformation.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nutritionalInformation: { ...prev.nutritionalInformation, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, images: [file] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images" && value[0]) {
        formDataToSend.append(key, value[0]);
      } else if (typeof value === "object" && !Array.isArray(value)) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formDataToSend.append(`${key}[${subKey}]`, subValue);
        });
      } else {
        formDataToSend.append(key, Array.isArray(value) ? value.join(",") : value);
      }
    });

    try {
      const token = sessionStorage.getItem('token');
      console.log(token);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/create-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`.trim(),
        },
        body: formDataToSend,
      });
      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        setError("");
        setFormData({
          productName: "",
          description: "",
          category: "",
          brand: "",
          petType: "",
          lifeStage: "",
          ingredients: [],
          nutritionalInformation: { protein: "", fat: "", fiber: "" },
          price: "",
          quantity: "",
          currency: "",
          discountType: "",
          discountValue: "",
          weight: "",
          allergens: [],
          images: [],
        });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add product.");
      }
    } catch (err) {
      setError("Error submitting form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-lg space-y-4 border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Add New Pet Product
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <Input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <Input
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          placeholder="Pet Type"
          required
        />
        <Input
          name="lifeStage"
          value={formData.lifeStage}
          onChange={handleChange}
          placeholder="Life Stage"
          required
        />
        <Input
          name="ingredients"
          value={formData.ingredients.join(", ")}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          required
        />
        <Input
          name="nutritionalInformation.protein"
          value={formData.nutritionalInformation.protein}
          onChange={handleChange}
          placeholder="Protein (%)"
          required
        />
        <Input
          name="nutritionalInformation.fat"
          value={formData.nutritionalInformation.fat}
          onChange={handleChange}
          placeholder="Fat (%)"
          required
        />
        <Input
          name="nutritionalInformation.fiber"
          value={formData.nutritionalInformation.fiber}
          onChange={handleChange}
          placeholder="Fiber (%)"
          required
        />
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <Input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <Input
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          placeholder="Pet Type"
          required
        />
        <Input
          name="lifeStage"
          value={formData.lifeStage}
          onChange={handleChange}
          placeholder="Life Stage"
          required
        />
        <Input
          name="ingredients"
          value={formData.ingredients.join(', ')}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          required
        />
        <Input
          name="nutritionalInformation.protein"
          value={formData.nutritionalInformation.protein}
          onChange={handleChange}
          placeholder="Protein Percentage"
          required
        />
        <Input
          name="nutritionalInformation.fat"
          value={formData.nutritionalInformation.fat}
          onChange={handleChange}
          placeholder="Fat Percentage"
          required
        />
        <Input
          name="nutritionalInformation.fiber"
          value={formData.nutritionalInformation.fiber}
          onChange={handleChange}
          placeholder="Fiber Percentage"
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
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Stock Quantity"
          type="number"
          required
        />
        <Input
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          placeholder="Currency (e.g., INR)"
          required
        />
        <Input
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          placeholder="Discount Type (e.g., fixed_amount)"
          required
        />
        <Input
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          placeholder="Discount Value"
          type="number"
        />
        <Input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          required
        />
        <Input
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          placeholder="Discount Type"
          required
        />
        <Input
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          placeholder="Discount Value"
          type="number"
        />
        <Input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (e.g., kg)"
          required
        />
        <Input
          name="allergens"
          value={formData.allergens.join(", ")}
          onChange={handleChange}
          placeholder="Allergens (comma separated)"
        />
        <Input
          name="allergens"
          value={formData.allergens.join(', ')}
          onChange={handleChange}
          placeholder="Allergens (comma separated)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Product Image
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
        Add Product
      </Button>
    </form>
  );
}