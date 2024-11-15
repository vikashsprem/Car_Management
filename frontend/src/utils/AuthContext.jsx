import React, { createContext, useContext, useState, useEffect } from "react";
import SnackBar from "../components/SnackBar";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (snackBar.open) {
      const timer = setTimeout(() => {
        setSnackBar({ ...snackBar, open: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackBar]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setSnackBar({ message: "Logged in successfully", open: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setSnackBar({ message: "Logged out successfully", open: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setSnackBar }}
    >
      {children}
      {snackBar.open && (
        <SnackBar message={snackBar.message} open={snackBar.open} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
