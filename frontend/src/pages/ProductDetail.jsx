import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api";
import { useAuth } from "../utils/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSnackBar } = useAuth();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Fetch product data on page load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response.data) {
          setProduct(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Product not found");
      }
    };

    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate("/products");
      setSnackBar({ message: "Product deleted successfully", open: true });
    } catch (error) {
      setError("Failed to delete product");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md mt-36">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* Images */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Images</h2>
        <div className="flex space-x-4">
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{product.description}</p>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        {product.tags && product.tags.length > 0 ? (
          <div className="flex flex-wrap space-x-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p>No tags available</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
