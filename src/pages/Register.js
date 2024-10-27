// src/pages/Register.js
import React, { useState, useEffect,useContext } from 'react';
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { AuthContext } from '../context/AuthContext';
import { IoMdEye,IoMdEyeOff } from "react-icons/io";


const Register = () => {
  const { currentUser } = useContext(AuthContext); // Access context to update the current user

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [phone, setPhone] = useState('');
  const [profilePicture, setprofilePicture] = useState('');
  const [coverPicture, setcoverPicture] = useState('');

  const [countryCode, setcountryCode] = useState('');
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (currentUser) {
      navigate('/'); // Change to your preferred route
    }
  }, [currentUser, navigate]);
  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)
      const userDetails = {
        firebaseUid: user.uid,  // Firebase user ID
        name,
        email,
        phone,
        countryCode,
        address,
        profilePicture,
        coverPicture,
        role: "user"
      };

      // Send user details to the backend (MongoDB) to store user profile
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, userDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Redirect to login or dashboard
        setLoading(false);
        navigate('/login');
      } else {
        setError('Failed to register. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const handleGoogleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // Create user in Firebase Authentication
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user)
      const userDetails = {
        firebaseUid: user.uid,
        name: user.displayName || "Google User", // Use the Google display name
        email: user.email,
        phone,
        countryCode,
        address,
        profilePicture: user.photoURL, // Use Google profile picture
        coverPicture,
        role: "user"
      };

      // Send user details to the backend (MongoDB) to store user profile
      const response = await axios.post(`http://localhost:5000/api/auth/register`, userDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Redirect to login or dashboard
        setLoading(false);
        navigate('/login');
      } else {
        setError('Failed to register. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div class="font-[sans-serif] bg-gray-100 dark:bg-gray-900">
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="items-center flex flex-col items-center justify-center bg-white p-6 shadow-sm dark:bg-gray-800 w-auto p-4 m-4 rounded-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div class="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleRegister}>
            <div class="mb-12">
              <h3 class="text-gray-800 dark:text-slate-50	  text-3xl font-extrabold">Sign up</h3>
              <p class="text-sm mt-4 text-gray-900 dark:text-stone-400">Have an account? <Link to={'/login'} class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sign in here</Link></p>
            </div>

            <div>
              <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Name</label>
              <div class="relative flex items-center">
                <input name="name"   value={name} onChange={(e) => setName(e.target.value)} type="text" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"  placeholder="Enter name" />
                
              </div>
            </div>

            <div class="mt-8">
              <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Email</label>
              <div class="relative flex items-center">
                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)}  type="email" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300" placeholder="Enter email" />
               
              </div>
            </div>
            <div class="mt-8">
                <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Password</label>
                <div class="relative flex items-center">
                  <input name="password" onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128"
                    onClick={togglePasswordVisibility} >
                    {showPassword ? <IoMdEyeOff color={'#bbb'} size={124} /> : <IoMdEye color={'#bbb'} size={124} />}
                  </svg>
                </div>
            </div>

            

            <div class="mt-8">
            <div className="flex space-x-4">
                    {/* Country Code Dropdown */}
                    <select
                      name="countryCode"
                      value={countryCode} 
                      onChange={(e) => setcountryCode(e.target.value)} 
                      className="w-1/4 p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                      required
                    >
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+880">+880 (Bangladesh)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+81">+81 (Japan)</option>
                      <option value="+49">+49 (Germany)</option>
                      <option value="+86">+86 (China)</option>
                      <option value="+33">+33 (France)</option>
                      {/* Add more country codes as needed */}
                    </select>

                    {/* Phone Number Input */}
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      required
                      className="w-3/4 p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                      />
                  </div>
            </div>
            <div class="mt-8">
              <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Address</label>
              <div class="relative flex items-center">
                <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)}  type="text" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300" placeholder="Enter address" />
               
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
              
              <div>
                <a href="jajvascript:void(0);" class="text-blue-600 font-semibold text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div class="mt-12">
            
              <button type="submit" disabled={loading} class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
            <div class="my-6 flex items-center gap-4">
              <hr class="w-full border-gray-300" />
              <p class="text-sm text-gray-900 dark:text-stone-50 text-center">or</p>
              <hr class="w-full border-gray-300" />
            </div>
            <div class="space-x-6 flex justify-center mt-6">
              <button type="button" onClick={handleGoogleRegister} class="w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-900 dark:text-stone-50 border border-gray-300 rounded-md bg-transparent dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" class="inline" viewBox="0 0 512 512">
                  <path fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00" />
                  <path fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58" />
                  <path fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52" />
                  <path fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6" />
                  <path fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48" />
                  <path fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132" />
                </svg>
                Continue with google
              </button>
              
            </div>
          </form>
        </div>

       
      </div>
    </div>
  </div>
    
  );
};

export default Register;
