import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full top-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Car Shop
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="space-x-6">
            <Link to="/products" className="hover:text-gray-300">
              Product List
            </Link>
            <Link to="/create" className="hover:text-gray-300">
              Create Product
            </Link>
            <button onClick={logout} className="hover:text-gray-300">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-x-6">
            {!isAuthenticated && (
              <Link to="/signin" className="hover:text-gray-300">
                Sign In
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
