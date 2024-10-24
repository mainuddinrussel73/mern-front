import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaHome, FaCalendarAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa'; // Import FontAwesome icons
import { MdClose, MdImage } from 'react-icons/md'; // Import Material Design icons


const Profile = () => {
    const { currentUser, logout, userRole } = useContext(AuthContext);
    const [userForm, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        countryCode: '',
        phone: '',
        address: '',
        role: 'user',
        firebaseUid: '',
        profilePicture: '',
        coverPicture: '',
  });
  console.log(currentUser);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect( () => {
    if(currentUser){
        fetUser();

    }
  }, [currentUser]);

  const fetUser = async() =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${currentUser.uid}`, {
            headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` },
        });
        console.log(response);
        if(response.data.success){
            setFormData({
                name: response.data._user.name,
                email: response.data._user.email,
                countryCode : response.data._user.countryCode,
                profilePicture: response.data._user.profilePicture,
                coverPicture: response.data._user.coverPicture,
                phone: response.data._user.phone,
                address: response.data._user.address,
              });
        }else{
          toast.error(response.data.message);
        }
      
  
      }catch(error){
  
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...userForm, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:5000/api/auth/users/${currentUser.uid}`,{
            
            data: {
                  userForm,
                  userRole, // Send userId in the body
            }
              
        } , {
            headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` },
        });
        
        setFormData({ name: '',password : '', email: '',countryCode: '', phone: '', address: '', role: 'user', firebaseUid: '' , profilePicture: '',coverPicture: ''});
        toast.success('User updated successfully');
        fetUser(); // Refresh the product list
        closeModal();
      } catch (error) {
        toast.error('Error deleting product');
      }
  };

  return (
    <div className='container mx-auto p-8  bg-gray-100 dark:bg-gray-900'>
      <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold dark:bg-gray-900 text-black dark:text-white ">Profile</h2>
          <button
            onClick={logout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition"
          >
            Logout
          </button>
        </header>
      
   {/* Profile Card */}
   <div className="profile-page p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 mt-6 mb-6 shadow-lg rounded-lg">

{/* Cover Photo */}
<div className="-mb-10">
  <img
    src={userForm.coverPicture || '/default-cover.jpg'}
    alt="Cover"
    className="w-full h-40 object-cover rounded-t-lg"
  />
</div>

{/* Profile Picture */}
<div className="mb-6 -mt-10 flex justify-center">
  <img
    src={userForm.profilePicture || '/default-avatar.png'}
    alt="Profile"
    className="rounded-full h-40 w-40 object-cover shadow-md border-2 border-gray-200"
  />
</div>
<div className='space-y-4 flex justify-center text-center'>
<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{userForm.name}</h3>

</div>
<div className='space-y-4  text-center mt-6'>
  {/* Address with Icon */}
<p className="text-gray-500 dark:text-stone-400 text-center ">
    <FaHome className="inline mr-2" /> 
    <span className="font-bold"></span> {userForm.address}
  </p>
</div>
{/* Profile Details */}
<div className="flex justify-center text-center">

  {/* Phone with Icon */}
  <p className="text-gray-500 dark:text-stone-400 flex justify-center text-center  m-4 ">
    <FaPhoneAlt className="inline mr-2 mt-1" />
    {userForm.phone}
  </p>

  {/* Email with Icon */}
  <p className="text-gray-500 dark:text-stone-400 flex justify-center text-center m-4">
    <FaEnvelope className="inline mr-2 mt-1" />
    {userForm.email}
  </p>

  

  
</div>
<div className='flex justify-center text-center'>
  {/* Account Creation Date */}
  <p className="text-white bg-green-600 rounded p-4  flex justify-center text-center m-4">
    <FaCalendarAlt className="inline mr-2 mt-1" />
    <span className="font-bold"></span> {new Date(userForm.createdAt).toLocaleDateString()}
  </p>

  {/* Last Update Date */}
  <p className="text-white bg-blue-600 rounded p-4  flex justify-center text-center m-4">
    <FaEdit className="inline mr-2 mt-1" />
    <span className="font-bold"></span> {new Date(userForm.updatedAt).toLocaleDateString()}
  </p>
</div>

{/* Edit Profile Button */}
<div className="mt-8 flex justify-center">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
    onClick={() => openModal()}
  >
    Edit Profile
  </button>
</div>
</div>

    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-semibold  text-gray-700 dark:text-gray-200 mb-4">
            Edit Profile
            </h2>
                <form onSubmit={handleSubmit} className='space-y-6 p-6 bg-white dark:bg-gray-800  rounded-lg' encType="multipart/form-data">
                
                    <input
                    type="text"
                    name="profilePicture"
                    value={userForm.profilePicture}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    required
                    />
                
                
                    <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    required
                    />
                
                
                    <div className="flex space-x-4">
                    {/* Country Code Dropdown */}
                    <select
                      name="countryCode"
                      value={userForm.countryCode}
                      onChange={handleInputChange}
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
                      value={userForm.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      className="w-3/4 p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    />
                  </div>
                
                  <textarea
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    required
                    />
                
               <form/>
               <button type="submit" className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                >
                    Update Profile
                </button>
                </form>
    
               
                <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-400 transition"

                >
                        <MdClose size={20} />
                </button>
            </div>
            
        </div>
    )}
    </div>
  );
};

export default Profile;
