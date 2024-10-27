// src/components/Navbar.js
import React, {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../assets/ThemeToggle';
import { FaBars, FaUser, FaSignInAlt, FaRegUserCircle, FaTh, FaStore } from "react-icons/fa"; // Icons for modern touch
import { HiMiniWallet } from "react-icons/hi2";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";


const Navbar = () => {
  const { currentUser,userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="dark:bg-gray-800 dark:text-white text-black bg-white	shadow body-font p-4  sticky top-0 z-50">
      <div className=" mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="dark:bg-gray-800 dark:text-white text-black bg-white text-3xl font-semibold tracking-wide   transition-all duration-300">
          <FaStore className="inline-block mr-2" /> Sell Bazar
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/products" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
            <HiMiniWallet className="inline-block mr-1" /> All Products
          </Link>
          {currentUser && userRole === "admin" ? (
            <>
                <Link to="/admindashboard" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                    <TbLayoutDashboardFilled className="inline-block mr-1" /> Admin Dashboard
                </Link>
                <Link to="/userdashboard" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                  <FaUser className="inline-block mr-1" /> User Dashboard
                </Link>
            </>
            
          ) : currentUser ? (
            <Link to="/userdashboard" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
              <FaUser className="inline-block mr-1" /> User Dashboard
            </Link>
          ) : null}

          {currentUser ? (
            <Link to="/profile" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
              <FaRegUserCircle className="inline-block mr-1" /> Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                <FaSignInAlt className="inline-block mr-1" /> Login
              </Link>
              <Link to="/register" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                <FaUser className="inline-block mr-1" /> Register
              </Link>
            </>
          )}

          <button className="text-white   transition duration-300">
            <ThemeToggle />
          </button>
        </div>

        {/* Hamburger Icon (Mobile Menu Toggle) */}
        <div className="md:hidden flex items-center ">
          <button onClick={toggleMobileMenu} className="dark:bg-gray-800 dark:text-white text-black bg-white  focus:outline-none">
            { (isMobileMenuOpen === true) ? 
            <AiOutlineClose className="w-6 h-6" />: 
            <FaBars className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 px-4 pb-4 bg- dark:bg-gray-800 dark:text-white text-black bg-slate-50	 rounded-lg mt-8">
            <Link to="/products" className="dark:bg-gray-800 dark:text-white text-black bg-slate-50 	   transition duration-300 ease-in-out">
              <HiMiniWallet className="inline-block mr-1" /> All Products
            </Link>
            {currentUser && userRole === "admin" ? (
              <>
                  <Link to="/admindashboard" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                      <TbLayoutDashboardFilled className="inline-block mr-1" /> Admin Dashboard
                  </Link>
                  <Link to="/userdashboard" className="dark:bg-gray-800 dark:text-white text-black bg-white   transition duration-300 ease-in-out">
                    <FaUser className="inline-block mr-1" /> User Dashboard
                  </Link>
              </>
              
             
            ) : currentUser ? (
              <Link to="/userdashboard" className="dark:bg-gray-800 dark:text-white text-black bg-slate-50   transition duration-300 ease-in-out">
                <FaUser className="inline-block mr-1" /> User Dashboard
              </Link>
            ) : null}

            {currentUser ? (
              <Link to="/profile" className="dark:bg-gray-800 dark:text-white text-black bg-slate-50   transition duration-300 ease-in-out">
                <FaRegUserCircle className="inline-block mr-1" /> Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="dark:bg-gray-800 dark:text-white text-black bg-slate-50   transition duration-300 ease-in-out">
                  <FaSignInAlt className="inline-block mr-1" /> Login
                </Link>
                <Link to="/register" className="dark:bg-gray-800 dark:text-white text-black bg-slate-50   transition duration-300 ease-in-out">
                  <FaUser className="inline-block mr-1" /> Register
                </Link>
              </>
            )}
            <button className="text-white   transition duration-300">
              <ThemeToggle />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
