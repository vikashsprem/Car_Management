import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import "./App.css";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  return <Navigate to="/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route
              path="/products"
              element={
                <AuthenticatedRoute>
                  <ProductList />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <AuthenticatedRoute>
                  <ProductCreate />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <AuthenticatedRoute>
                  <ProductDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <AuthenticatedRoute>
                  <ProductEdit />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/page-not-found" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
