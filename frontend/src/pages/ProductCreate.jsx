import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api";
import { useAuth } from "../utils/AuthContext";
const ProductCreate = () => {
  const navigate = useNavigate();
  const { setSnackBar } = useAuth();

  const [form, setForm] = useState({
    images: [],
    title: "",
    description: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImageURL = () => {
    if (imageUrl && !form.images.includes(imageUrl)) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
      setImageUrl(""); // Clear the input after adding
    }
  };

  const handleAddTag = () => {
    if (newTag && !form.tags.includes(newTag)) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleRemoveImage = (imageToRemove) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: form.title,
      description: form.description,
      tags: form.tags,
      images: form.images,
    };

    try {
      await createProduct(formData);
      setSnackBar({ message: "Product created successfully", open: true });
      navigate("/products");
    } catch (error) {
      setError("Failed to create product");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="title"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Image URL Input */}
        <label className="block mb-2 font-semibold">Add Image URL:</label>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="p-2 border rounded w-full mr-2"
          />
          <button
            type="button"
            onClick={handleAddImageURL}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Image Preview */}
        <div className="flex flex-wrap space-x-2 mb-4">
          {form.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center pb-1">
                <p className="text-white text-xs">Image {index + 1}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(image)}
                className="absolute top-0 right-1 text-white font-bold rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Tags Input */}
        <label className="block mb-2 font-semibold">Tags:</label>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="p-2 border rounded w-full mr-2"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap space-x-2 mb-4">
          {form.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
