import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import '../styles/UserDashboard.css'
import { Helmet } from 'react-helmet';

const UserDashboard  = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5; // Number of items per page

  useEffect(() => {
    const fetchPurchases = async (page) => {
      if (!currentUser) return;

      try {
        const token = await currentUser.getIdToken();
        
        const response = await axios.get(`http://localhost:5000/api/purchases/userpurchase` , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            uid : currentUser.uid,
            page: page,
            limit: limit,
          }
        });
        console.log(response.data.purchases);
        setPurchases(response.data.purchases);
        setTotalSpent(response.data.totalAmountSpent);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Failed to fetch purchases');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases(currentPage);
  }, [currentUser,currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/login'); // Redirect to login after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className="container  mx-auto p-4  bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>User Dashboard</title>
        <meta name="Userdashboard" content="Userdashboard" />
      </Helmet>
      <div className="bg-white dark:bg-gray-800  max-w-4xl rounded-lg  p-6 mb-6  mx-auto">
        <h2 className="text-gray-900 dark:text-stone-400 text-3xl font-extrabold  mb-6">Your Purchases</h2>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-500 dark:text-stone-200 text-xl font-semibold ">Total Amount Spent:</h3>
          <span className="text-2xl font-bold text-green-500">${totalSpent.toFixed(2)}</span>
        </div>

        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      {purchases.length > 0  ? (
        <>
         <ul className="space-y-6">
            {purchases.map((purchase) => (
              (purchase.productId !== null) ? 
                <>
                <li key={purchase._id} className="p-6 max-w-4xl  mx-auto bg-white dark:bg-gray-800  rounded-lg">
                  <div>
                    
                    <h3 className="font-semibold text-red-400 text-xl mb-2">
                      {purchase.productId.name}
                    </h3>
                    <p className=" text-green-400">Price: <span className="font-bold">${purchase.totalPrice}</span></p>
                    <p className="text-gray-900 dark:text-stone-400">Quantity: <span className="font-bold">{purchase.quantity}</span></p>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg mt-4 transition duration-300">
                      Pay Now
                    </button>
                  </div>
                </li>
                </> : <></> 
              
            ))}
        </ul>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center space-x-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg transition duration-300 ${
                currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-lg transition duration-300 ${
                currentPage === totalPages ? "  cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Next
            </button>
          </div>


        
        </>
      ) : (
        <p>You haven’t purchased anything yet.</p>
      )}
    </div>
  );
};

export default UserDashboard ;