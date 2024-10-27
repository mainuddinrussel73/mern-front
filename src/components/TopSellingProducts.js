import React, { useEffect, useState } from 'react';
import "../styles/TopSellingProducts.css"
import { IoPricetagsOutline } from "react-icons/io5";
import { PiBagLight } from "react-icons/pi";
import { Link } from 'react-router-dom';


const TopSellingProducts = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const fetchTopSellingProducts = async (page = 1, filters = {}) => {
        try {
            const query = new URLSearchParams({
                ...filters,
                page,
                limit: 10
            }).toString();

            fetch(process.env.REACT_APP_API_URL+`/api/purchasehighlight/top-selling-products?${query}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch top-selling products');
                    }
                    return response.json(); // Parse the JSON from the response
                })
                .then(data => {
                    setTopProducts(data.data);
                    console.log(data); // Use the fetched data here
                })
                .catch(error => {
                    console.error(error); // Handle errors here
                });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopSellingProducts(page, filters);
    }, [page, filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (loading) {
        return <div className="text-center text-xl font-bold">Loading top products...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center text-lg">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Top Selling Products</h2>

            {/* Filter Inputs */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                    placeholder="End Date"
                />
                <input
                    type="text"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                    placeholder="Category"
                />
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                    placeholder="Min Price"
                />
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                    placeholder="Max Price"
                />
                <button
                    onClick={() => fetchTopSellingProducts(1, filters)}
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProducts.map(product => (
                    <div key={product.productId}>
                        <div class="h-full  rounded-lg overflow-hidden bg-white dark:bg-gray-800 ">
                            <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={product.productDetails.imageUrl} alt={product.productDetails.name}/>
                            <div class="p-6">
                                    <h2 class="text-gray-900 dark:text-white-100 tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{product.categoryDetails.name}</h2>
                                    <h1 class="text-gray-900 dark:text-white title-font text-lg font-medium text-gray-900 mb-3">{product.productDetails.name}</h1>
                                    <p class="text-gray-900 dark:text-stone-400 leading-relaxed mb-3">{product.productDetails.description}</p>
                                    <div class="flex items-center flex-wrap ">
                                        <Link to={`/product/${product.productId}`} class="text-purple-500 inline-flex items-center md:mb-2 lg:mb-0">Details
                                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                        </Link>
                                        <span class="bg-red-50 text-red-900 mr-3 pt-5 pb-5 px-5 rounded inline-flex items-center  ml-auto leading-none text-xl ">
                                        <PiBagLight/>{product.totalQuantity}
                                        </span>

                                        <span class="bg-yellow-100 text-yellow-900 pt-5 pb-5 px-5 rounded inline-flex items-center leading-none text-xl">
                                        <IoPricetagsOutline/>{product.productDetails.price}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-l bg-blue-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-blue-200">Page {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 rounded-r bg-blue-300 hover:bg-blue-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TopSellingProducts;
