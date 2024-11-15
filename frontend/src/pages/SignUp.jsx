import React, { useState } from "react";
import { signUp } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { setSnackBar } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form);
      navigate("/signin");
      setSnackBar({ message: "Account created successfully", open: true });
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
