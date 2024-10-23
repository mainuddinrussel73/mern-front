// src/pages/Login.js
import React, { useState,useContext,useEffect } from 'react';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Import the auth object
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; // Import axios


const Login = () => {
  const { currentUser,setCurrentUser,setUserRole } = useContext(AuthContext); // Access context to update the current user

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/'); // Change to your preferred route
    }
  }, [currentUser, navigate]);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("loggin");
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    try {
      // Firebase Authentication for email and password
      const userCredential = await signInWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      console.log(user);
      // Get the Firebase ID token from the logged-in user
      const token = await user.getIdToken();

      // Fetch user details from the backend, sending the token for authorization
      const response = await fetch(`http://localhost:5000/api/auth/login/${user.uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Send token in the Authorization header
        },
      });

      const data = await response.json();
      setLoading(false);
      console.log(data);

      if (data.success) {
        
       
        user.displayName = data._user.name;
        user.email = data._user.email;
        user.phoneNumber = data._user.phone;
        setUserRole(data._user.role);
        setCurrentUser(user);

        // If the user is an admin, redirect to admin dashboard
        if (data._user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          // Otherwise, redirect to user dashboard
          navigate('/userdashboard');
        }
      } else {
        setError('Failed to fetch user details.');
        navigate('/register');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      navigate('/register');
    }
  };

  const handleGoogleLogin = async(e) =>{
    e.preventDefault();
    setLoading(true);
    console.log("loggin");
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    try {
      const provider = new GoogleAuthProvider();

      // Firebase Authentication for email and password
     
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      // Get the Firebase ID token from the logged-in user
      const token = await user.getIdToken();

      const userDetails = {
        firebaseUid: user.uid,
        name: user.displayName || "Google User", // Use the Google display name
        email: user.email,
        phone : user.phoneNumber,
        countryCode: '',
        address : '',
        profilePicture: user.photoURL, // Use Google profile picture
        coverPicture : '',
        role: "user"
      };
      const response = await axios.post(`http://localhost:5000/api/auth/register`, userDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
 
      setLoading(false);

      if (response.data.success) {
        
       
        user.displayName = response.data._user.name;
        user.email = response.data._user.email;
        user.phoneNumber = response.data._user.phone;
        setUserRole(response.data._user.role);
        setCurrentUser(user);

        // If the user is an admin, redirect to admin dashboard
        if (response.data._user.role === 'admin') {
          navigate('/admindashboard');
        } else {
          // Otherwise, redirect to user dashboard
          navigate('/userdashboard');
        }
      } else {
        setError('Failed to fetch user details.');
        navigate('/register');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      navigate('/register');
    }
      
    
  };

  return (
    <div class="font-[sans-serif] bg-gray-100 dark:bg-gray-900">
      <div class="min-h-screen flex flex-col items-center justify-center">
        <div class="items-center flex flex-col items-center justify-center bg-white p-6 shadow-sm dark:bg-gray-800 w-auto p-4 m-4 rounded-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div class="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleLogin}>
              <div class="mb-12">
                <h3 class="text-gray-800 dark:text-slate-50	  text-3xl font-extrabold">Sign in</h3>
                <p class="text-sm mt-4 text-gray-900 dark:text-stone-400">Don't have an account <Link to={'/register'} class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
              </div>

              <div>
                <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Email</label>
                <div class="relative flex items-center">
                  <input name="email"  onChange={(e) => setEmail(e.target.value)} value={email} type="text" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"  placeholder="Enter email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div class="mt-8">
                <label class="text-gray-900 dark:text-stone-400 text-xs block mb-2">Password</label>
                <div class="relative flex items-center">
                  <input name="password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-300 border-gray-300 bg-gray-100 dark:bg-gray-700  rounded" />
                  <label for="remember-me" class="ml-3 block text-sm text-gray-900 dark:text-stone-300">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="jajvascript:void(0);" class="text-blue-600 font-semibold text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div class="mt-12">
              
                <button type="submit" disabled={loading} class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
              <div class="my-6 flex items-center gap-4">
                <hr class="w-full border-gray-300" />
                <p class="text-sm text-gray-900 dark:text-stone-50 text-center">or</p>
                <hr class="w-full border-gray-300" />
              </div>
              <div class="space-x-6 flex justify-center mt-6">
                <button type="button" onClick={handleGoogleLogin} class="w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-900 dark:text-stone-50 border border-gray-300 rounded-md bg-transparent dark:hover:bg-gray-900 hover:bg-gray-100 focus:outline-none">
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

export default Login;
