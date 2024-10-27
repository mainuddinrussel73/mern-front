import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-white text-black bg-slate-50 shadow body-font ">
      <div className="  px-5 shadow py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          <div className="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 className="dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 title-font font-medium  tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={`/products_cat/Books`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Books
                </Link>
              </li>
              <li>
                <Link to={`/products_cat/Courses`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Courses
                </Link>
              </li>
              <li>
                <a to={`/products_cat/Computers`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Computers
                </a>
              </li>
              <li>
                <Link to={`/products_cat/Mobiles`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Mobiles
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 tracking-widest text-sm mb-3">
              RESOURCES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 hover:text-gray-800">
                  Terms of Service
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium dark:bg-gray-800 dark:text-white text-gray-900 bg-slate-50 tracking-widest text-sm mb-3">
              SUPPORT
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to={`/aboutus`} className="dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50 hover:text-gray-800">
                  Shipping Info
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className=" px-5 py-8 flex flex-wrap mx-auto items-center">
          <div className="container flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
            <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
              <label htmlFor="footer-field" className="leading-7 text-sm dark:bg-gray-800 dark:text-white text-gray-600 bg-slate-50">
                Subscribe
              </label>
              <input
                type="text"
                id="footer-field"
                name="footer-field"
                placeholder="Your Email"
                className="w-full dark:bg-gray-600 dark:text-white text-gray-900 bg-slate-50 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-purple-200 focus:border-purple-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
              Subscribe
            </button>
            <p className="ml-4 text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
              Get the latest updates on new products and offers.
            </p>
          </div>
          <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
            <a onClick={()=> window.open("https://facebook.com", "_blank")}  className="dark:bg-gray-800 dark:text-white text-gray-500 bg-slate-50">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a  onClick={()=> window.open("https://twitter.com", "_blank")}  className="ml-3 dark:bg-gray-800 dark:text-white text-gray-500 bg-slate-50">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a  onClick={()=> window.open("https://instagram.com", "_blank")} className="ml-3 dark:bg-gray-800 dark:text-white text-gray-500 bg-slate-50">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" className="ml-3 dark:bg-gray-800 dark:text-white text-gray-500 bg-slate-50">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
      <div className="">
        <div className="  mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className=" dark:text-white text-gray-500 text-sm text-center sm:text-left">
            © 2024 Your Shop —
            <a
              href="https://twitter.com/yourshop"
              className="dark:text-white text-gray-600 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Sell Bazar
            </a>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center dark:bg-gray-800 dark:text-white text-gray-500 bg-slate-50 text-sm">
            Designed by Sell Bazar Team
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
