import React, {useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { IoIosPricetags } from "react-icons/io";
import { MdClose } from 'react-icons/md';
import Loading from '../components/Loading';
import ErrorLoadingData from './ErrorLoadingData';

const AdminDashboard  = () => {

  const { currentUser,userRole, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/login'); // Redirect to login after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    rating: '',
  });
  const [editingProductId, setEditingProductId] = useState(null);
  

  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: '',
    countryCode: '',
    phone: '',
    address: '',
    role: 'user',
    firebaseUid: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [editingCategoryId, setEditingCategoryId] = useState(null); // For editing category
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' }); // Category form data


  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalType, setModalType] = useState(''); // To track which modal (product/user)

  const [error, setError] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({ name: '', description: '', price: '', imageUrl: '', category: '', rating: '' });
    setUserForm({ name: '', email: '', profilePicture: '', password: '', countryCode : '', phone: '', address: '', role: 'user', firebaseUid: '' });
  };

  useEffect(() => {
    const setAuthToken = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${await currentUser.getIdToken()}`;
    };
    setAuthToken();
  }, [currentUser]);

  useEffect(() => {
    if (userRole !== 'admin') {
      // Redirect non-admin users to the homepage or login page
      navigate('/');
    }
    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, []);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (modalType === 'product') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if(modalType === 'user') {
      setUserForm((prev) => ({ ...prev, [name]: value }));
    } else if(modalType === 'category') {
      setCategoryForm((prev) => ({ ...prev, [name]: value }));
    }
  };


  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/users`, {
        data: {
          userForm,
          userRole, // Send userId in the body
        }
      });
      setEditUserId(null);
      setEditMode(false);
      toast.success('User added successfully');
      setUserForm({ name: '',password : '', profilePicture : '', email: '', countryCode: '', phone: '', address: '', role: 'user', firebaseUid: '' });
      fetchUsers(); // Refresh the product list
      closeModal();
    } catch (error) {
      toast.error('Error deleting product');
    }
    
      
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/users/${editUserId}`, {
        data: {
          userForm,
          userRole, // Send userId in the body
        }
      });
      setEditMode(false);
      setUserForm({ name: '',password : '', email: '',countryCode: '', profilePicture: '', phone: '', address: '', role: 'user', firebaseUid: '' });
      setEditUserId(null);
      toast.success('User added successfully');
      fetchUsers(); // Refresh the product list
      closeModal();
    } catch (error) {
      toast.error('Error deleting product');
    }
    
  };

  // Delete user
  const handleDeleteUser = async (id) => {

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/users/${id}`, {
        data: {
          userRole, // Send userId in the body
        },
      })
      toast.success('Product deleted successfully');
      fetchUsers(); // Refresh the product list
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  // Set edit mode
  const handleEditUser = (user) => {
    openModal('user');
    setEditMode(true);
    setEditUserId(user.firebaseUid);
    setUserForm({
      name: user.name,
      email: user.email,
      countryCode: user.countryCode,
      profilePicture : user.profilePicture,
      phone: user.phone,
      password : '',
      address: user.address,
      role: user.role,
      firebaseUid: user.firebaseUid
    });
  };

  const fetchUsers = async () => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/users`);
      console.log(response);
      if(response.data.success){
        setUsers(response.data.users);
        setLoading(false);

      }else{
        toast.error(response.data.message);
      }
    

    }catch(error){

    }
  }

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      if(response.data.ok){
        setProducts(response.data.data);
        setLoading(false);

      }else{
        toast.error(response.data.message);
      }
     
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      if(response.data.ok){
        setCategories(response.data.data);
        setLoading(false);

      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        // Update product
        await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${editingProductId}`, {
          data: {
            formData,
            userRole, // Send userId in the body
          },
        });
        toast.success('Product updated successfully');
      } else {
        // Add new product
        await axios.post(`${process.env.REACT_APP_API_URL}/api/products/create`,{
          data: {
            formData,
            userRole, // Send userId in the body
          },
        });
        toast.success('Product added successfully');
      }
      setFormData({ name: '', description: '', price: '', imageUrl: '', category: '', rating: '' });
      fetchProducts(); // Refresh the product list
      setEditingProductId(null); // Reset the editing state
      closeModal();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  // Edit product
  const handleEdit = (product) => {
    openModal('product')
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category._id,
      rating: product.rating,
    });
    setEditingProductId(product._id);
  };

  // Delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`,{
        data: {
          userRole, // Send userId in the body
        },
      });
      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the product list
      
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  const handleCategorySubmit = async(e) => {
    e.preventDefault();
    if (editingCategoryId) {
      // Update category logic here
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/categories/${editingCategoryId}`,{
          data: {
            categoryForm,
            userRole, // Send userId in the body
          },
        });
        toast.success('Category edited successfully');
        
      } catch (error) {
        toast.error('Error editing category');

      }

    } else {
      // Add category logic here
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/categories/create`,{
          data: {
            categoryForm,
            userRole, // Send userId in the body
          },
        });
        toast.success('Category added successfully');
        
      } catch (error) {
        toast.error('Error adding category');

      }

    }
    setCategoryForm({ name: '', description: '' });
    fetchCategories(); // Refresh the product list
    setEditingCategoryId(null); // Reset the editing state
    closeModal();
  };
  const handleEditCategory = (category) => {
    setCategoryForm({ name: category.name, description: category.description });
    setEditingCategoryId(category._id);
    openModal('category');
  };
  
  // Handle category delete
  const handleDeleteCategory = async(categoryId) => {
    // Delete category logic here
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`,{
        data: {
          userRole, // Send userId in the body
        },
      });
      toast.success('Category deleted successfully');
      fetchCategories(); // Refresh the product list
      
    } catch (error) {
      toast.error('Error deleting category');
    }
  };
  if (loading) return <Loading />;

  if(error){
    return <ErrorLoadingData/>;
  }
  return (
    userRole === 'admin' ? (
      <div className="admin-dashboard p-6 min-h-screen  bg-gray-100 dark:bg-gray-900">
        <Helmet>
        <title>Admin Dashboard</title>
        <meta name="Admin Dashboard" content="Admin Dashboard page" />
        </Helmet>
        {/* Admin Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold dark:bg-gray-900 text-black dark:text-white ">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition"
          >
            Logout
          </button>
        </header>
    
        {/* Error Handling */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
    
        {/* Add User & Product Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => openModal('user')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add User
          </button>
          <button
            onClick={() => openModal('product')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Product
          </button>
          <button
            onClick={() => openModal('category')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Category
          </button>
        </div>
    
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="  bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
              <h2 className="text-2xl font-semibold  text-gray-700 dark:text-gray-200 mb-4">
                {modalType === 'product' ? 'Add Product' : ''}
                {modalType === 'user' ? 'Add User' : ''}
                {modalType === 'category' ? 'Add Category' : ''}

              </h2>
    
              {/* Form */}
              {modalType === 'product' ? (
                <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800  rounded-lg">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Product Price"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Product Image URL"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="Rating (1-5)"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  >
                    {editingProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              ): <></>}
              {modalType === 'user' ? (
                <form
                  onSubmit={editMode ? handleUpdateUser : handleAddUser}
                  className="space-y-6 p-6 bg-white dark:bg-gray-800  rounded-lg"
                  >
                  <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"

                  />
                  <input
                    type="text"
                    name="profilePicture"
                    value={userForm.profilePicture}
                    onChange={handleInputChange}
                    placeholder="Profile Picture"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"

                  />
                  {!editMode && (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={userForm.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                      <input
                        type="password"
                        name="password"
                        value={userForm.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                        />
                    </>
                  )}
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
                  <input
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    />
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                    >
                    {editMode ? 'Update User' : 'Add User'}
                  </button>
                </form>
              ) : <></>}

              {modalType === 'category' ? (
                  <form onSubmit={handleCategorySubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800  rounded-lg">
                  <input
                    type="text"
                    name="name"
                    value={categoryForm.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  <textarea
                    name="description"
                    value={categoryForm.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
                  >
                     {editingCategoryId ? 'Update Category' : 'Add Category'}
                  </button>
                </form>
              ) : <></> }
    
              {/* Close Modal Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-400 transition"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
        )}
    
        {/* User List */}
        <h3 className="text-2xl font-semibold  mb-4 mt-6 text-black dark:text-white">User List</h3>
        <div className='flex-auto block py-8 pt-6 px-9 '>

          {/* Table Container */}
          <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <table className="w-full text-dark dark:text-gray-300 border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark dark:text-gray-400">
                  
                  <th className="pb-3 text-start min-w-[175px]">Picture</th>
                  <th className="pb-3 text-start min-w-[175px]">Name</th>
                  <th className="pb-3 text-center min-w-[100px]">Email</th>
                  <th className="pb-3 text-center min-w-[100px]">Country Code</th>
                  <th className="pb-3 pr-12 text-end min-w-[100px]">Phone</th>
                  <th className="pb-3 pr-12 text-end min-w-[100px]">Address</th>
                  <th className="pb-3 pr-12 text-end min-w-[100px]">Role</th>
                  <th className="pb-3 pr-12 text-end min-w-[175px]">Actions</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user) => (
                 (user.firebaseUid !== currentUser.uid) ? <>
                  <tr key={user._id} className="border-b border-dashed dark:border-gray-700 last:border-b-0">
                    <td className="p-3 pl-0">
                      <div className="flex items-center">
                        <div className="relative inline-block bg-contain shrink-0 rounded-2xl me-3">
                          <img
                            src={user.profilePicture}
                            alt=""
                            className="w-[150px] h-[150px] inline-block shrink-0 object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pb-3 text-start min-w-[175px] text-center">
                      <span className="font-semibold text-light-inverse dark:text-gray-200 text-md/normal">
                        {user.name}
                      </span>
                    </td>
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{user.email}</td>
                    <td className="p-4">
                      <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-900 rounded-lg">
                        {user.countryCode}  
                      </span>
                    </td>
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{user.phone}</td>
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{user.address}</td>
                    <td className="p-4">
                      {(user.role == 'admin') ? 
                        <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-900 rounded-lg">
                          {user.role}  
                        </span>
                      :
                      
                        <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-900 rounded-lg">
                          {user.role}  
                        </span>
                      }
                      
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-100 text-yellow-900 p-4 rounded hover:bg-yellow-400 dark:bg-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-500 transition mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.firebaseUid)}
                        className="bg-red-100 text-red-900 p-4 rounded hover:bg-red-400 dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-500 transition"

                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  </> : <></> 
                  
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
        
    
        {/* Product List */}
        <h3 className="text-2xl font-semibold  mb-4 mt-6 text-black dark:text-white">Product List</h3>
        <div className='flex-auto block py-8 pt-6 px-9 '>

          {/* Table Container */}
          <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <table className="w-full text-dark dark:text-gray-300 border-neutral-200">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark dark:text-gray-400">
                  <th className="pb-3 text-start min-w-[175px]">Picture</th>
                  <th className="pb-3 text-start min-w-[175px]">Name</th>
                  <th className="pb-3 text-center min-w-[100px]">Description</th>
                  <th className="pb-3 text-center min-w-[100px]">Price</th>
                  <th className="pb-3 pr-12 text-end min-w-[100px]">Category</th>
                  <th className="pb-3 pr-12 text-end min-w-[100px]">Rating</th>
                  <th className="pb-3 pr-12 text-end min-w-[175px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-dashed dark:border-gray-700 last:border-b-0">
                    <td className="p-3 pl-0">
                      <div className="flex items-center">
                        <div className="relative inline-block bg-contain shrink-0 rounded-2xl me-3">
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="w-[150px] h-[150px] inline-block shrink-0 object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pb-3 text-start min-w-[175px] text-center">
                      <span className="font-semibold text-light-inverse dark:text-gray-200 text-md/normal">
                        {product.name}
                      </span>
                    </td>
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{product.description}</td>
                    <td className="p-3 pr-0 text-center">
                      <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-900 rounded-lg">
                        ${product.price}
                      </span>
                    </td>
                    <td className="p-3 pr-12 text-end">
                      <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light dark:text-primary-light dark:bg-primary-dark rounded-lg">
                        {categories.find((cat) => cat._id === product.category)?.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-center inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-900 rounded-lg">
                        {product.rating}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-100 text-yellow-900 p-4 rounded hover:bg-yellow-400 dark:bg-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-500 transition mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-100 text-red-900 p-4 rounded hover:bg-red-400 dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      

        {/* Category List */}
        <h3 className="text-2xl font-semibold text-black dark:text-white  mb-4 mt-6">Category List</h3>
        <div className='flex-auto block py-8 pt-6 px-9 '>

          <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <thead className="align-bottom">
                <tr className="font-semibold text-[0.95rem] text-secondary-dark dark:text-gray-400">
                  <th className="p-4 text-center ">Name</th>
                  <th className="p-4 text-center ">Description</th>
                  <th className="p-4 text-center ">Actions</th>

                </tr>
              </thead>
              <tbody>
                {categories.map((product) => (
                  <tr key={product._id} className="border-b border-dashed dark:border-gray-700 last:border-b-0">
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{product.name}</td>
                    <td className="p-3 pr-0 text-center dark:text-gray-300">{product.description}</td>
                  
                    <td className="p-4 ">
                      <button
                        onClick={() => handleEditCategory(product)}
                        className="bg-yellow-100 text-yellow-900 p-4 rounded hover:bg-yellow-400 dark:bg-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-500 transition mr-2"
                        >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(product._id)}
                        className="bg-red-100 text-red-900 p-4 rounded hover:bg-red-400 dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-500 transition"
                        >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center mt-10">
        <p className="text-xl text-red-600 font-semibold">Unauthorized Access</p>
      </div>
    )
    
  );
};

export default AdminDashboard ;