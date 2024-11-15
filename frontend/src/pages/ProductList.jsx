import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 mt-16">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          className="p-2 border rounded w-1/3"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/create" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add New Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="border rounded p-4"
            >
              <img
                src={product.images[0] || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-gray-600">
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
