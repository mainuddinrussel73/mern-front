import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard  from './pages/UserDashboard';
import AdminDashboard  from './pages/AdminDashboard';
import Profile from './pages/Profile'
import ProductsCat from './pages/ProductsCat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound'; // Your 404 page

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products_cat/:category" element={<ProductsCat />} />

          {/* Wrap the protected route in PrivateRoute */}
          <Route
            path="/product/:id"
            element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userdashboard"
            element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
            }
          />
          <Route
            path="/admindashboard"
            element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
            }
          />
           <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
