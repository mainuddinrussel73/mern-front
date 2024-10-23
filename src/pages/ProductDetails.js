// src/pages/ProductDetails.js
import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // For toasts
import Modal from 'react-modal'; // For modal functionality
import axios from 'axios'; // For making API calls
import { Helmet } from 'react-helmet';
import { MdClose } from 'react-icons/md';
import { FaBagShopping } from "react-icons/fa6";

const ProductDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(currentUser);
  const [purchaseDetails, setPurchaseDetails] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    quantity: 1,
    paymentMethod: 'Credit Card',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    additionalInfo: '',
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProductDetails = async () => {
        if (!currentUser) return; // Do not fetch if user is not logged in

        try {
            const token = await currentUser.getIdToken(); // Get Firebase token
            console.log(token);
            const response = await fetch(`http://localhost:5000/api/products/product/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,  // Send token in the Authorization header
              },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product details.');
            }

            const data = await response.json();
            setProduct(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (currentUser) {
        fetchProductDetails();
    }else{
      navigate('/login')
    }
  }, [currentUser,id,navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.error('You need to be logged in to buy a product!');
      return;
    }
    setModalIsOpen(true);
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = product.price * purchaseDetails.quantity; // Calculate total price

    // Construct request body
    const requestBody = {
      productId: id, // The ID of the product being purchased
      firebaseUid: currentUser.uid, // The logged-in user's ID
      quantity: purchaseDetails.quantity,
      totalPrice: totalPrice,
      paymentMethod: purchaseDetails.paymentMethod, // Dynamic payment method
      shippingAddress: {
        name: purchaseDetails.name,
        addressLine1: purchaseDetails.addressLine1,
        addressLine2: purchaseDetails.addressLine2,
        city: purchaseDetails.city,
        state: purchaseDetails.state,
        zipCode: purchaseDetails.zipCode,
        country: purchaseDetails.country,
      },
    };

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/api/purchases/create', requestBody, {
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`, // Send Firebase token
        },
      });
      console.log(response);
      if (response.data.ok) {
        toast.success(response.data.message); // Show success toast
        setModalIsOpen(false); // Close modal after successful purchase
    
        // Reset form fields
        setPurchaseDetails({
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
          phone: currentUser?.phoneNumber || '',
          quantity: 1,
          paymentMethod: 'Credit Card',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          additionalInfo: '',
        });
      }else {
        toast.error('Something went wrong. Please try again.'); // Show error toast if status is not OK
      }
      
    } catch (error) {
      console.error('Error making purchase:', error);
      toast.error('Purchase failed. Please try again.');
    }
  };
  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!currentUser) {
      return <div>Please log in to view product details.</div>;
  }

  return (
    <>
       <Helmet>
        <title>Product Details</title>
        <meta name="Details" content="Details page" />
      </Helmet>
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img class="w-full" src={product.imageUrl} alt={product.name} />
            </div>

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1
                class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
              >
                {product.name}
              </h1>
              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p
                  class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                >
                  ${product.price}
                </p>

                <div class="flex items-center gap-2 mt-2 sm:mt-0">
                  <div class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                      />
                    </svg>
                  </div>
                  <p
                    class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                  >
                    ({product.rating})
                  </p>
                  <a
                    href="#"
                    class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </a>

                <a
                  href="#"
                  title=""
                  class="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  flex items-center justify-center"
                  role="button"
                >
                  <svg
                    class="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>

                  Add to cart
                </a>
                <a
                  href="#"
                  title=""
                  class="text-white mt-4 sm:mt-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  flex items-center justify-center"
                  role="button"
                  onClick={handleBuyNow}
         
                >
                  <FaBagShopping/>
                  <p className='mx-2'>Buy now</p>
                </a>
              </div>

              <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>

              
            </div>
          </div>
        </div>
      </section>
     

      {/* Purchase modal */}
       {/* Purchase modal */}
       <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black  bg-opacity-70"
        >
          <div className="bg-gray-800 text-white mt-10 rounded-lg shadow-lg max-w-lg w-full p-8 overflow-y-auto max-h-[80vh] relative scrollbar-none">
            <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
            <form onSubmit={handlePurchaseSubmit} className="space-y-4">
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="name"
                value={purchaseDetails.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="email"
                name="email"
                value={purchaseDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="phone"
                value={purchaseDetails.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="number"
                name="quantity"
                value={purchaseDetails.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                min="1"
                required
              />
              <select
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                name="paymentMethod"
                value={purchaseDetails.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="addressLine1"
                value={purchaseDetails.addressLine1}
                onChange={handleInputChange}
                placeholder="Address Line 1"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="addressLine2"
                value={purchaseDetails.addressLine2}
                onChange={handleInputChange}
                placeholder="Address Line 2 (Optional)"
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="city"
                value={purchaseDetails.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="state"
                value={purchaseDetails.state}
                onChange={handleInputChange}
                placeholder="State"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="zipCode"
                value={purchaseDetails.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code"
                required
              />
              <input
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                type="text"
                name="country"
                value={purchaseDetails.country}
                onChange={handleInputChange}
                placeholder="Country"
                required
              />
              <textarea
                className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg"
                name="additionalInfo"
                value={purchaseDetails.additionalInfo}
                onChange={handleInputChange}
                placeholder="Additional Information (Optional)"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out w-full"
              >
                Complete Purchase
              </button>
            </form>
            {/* Close Modal Button */}
            <button
                onClick={() => setModalIsOpen(false)}
                className="absolute top-2 right-2 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-400 transition"
              >
                <MdClose size={20} />
            </button>
           
          </div>
        </Modal>
        



    </>
  );
};

export default ProductDetails;
