import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const cate = [
    
    { name: 'Books', icon: '📚', link: '/category/books' },
    { name: 'Courses', icon: '🎓', link: '/category/courses' },
    { name: 'Used Products (Recycle)', icon: '♻️', link: '/category/used-products' },
    { name: 'Bikes', icon: '🚲', link: '/category/bikes' },
    { name: 'Mobiles', icon: '📱', link: '/category/mobiles' },
    { name: 'Computers', icon: '💻', link: '/category/computers' },
    { name: 'Cars', icon: '🚗', link: '/category/cars' },
    { name: 'TV', icon: '📺' },
    { name: 'Tablets', icon: '📱' },
    { name: 'Audio', icon: '🎧' },
    { name: 'Printers', icon: '🖨️' },
    { name: 'Computer Accessories', icon: '⌨️' },
    { name: 'Security & Wi-Fi', icon: '🔒' },
    { name: 'Deals', icon: '🏷️' },
  ];
  useEffect(() => {
    // Fetch categories from backend
    fetch(process.env.REACT_APP_API_URL+'/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.data));
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-10 bg-gray-100 dark:bg-gray-900">
    {/* Header */}
    <div className=" items-center mb-6">
      <h2 className="text-2xl font-bold text-black dark:text-white text-center">Categories that might interest you</h2>
    </div>

    {/* Categories Grid */}
    <div className="grid grid-cols-1 m-10 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Link  to={`/products_cat/${category.name}`}  key={index} className="flex flex-col items-center p-6 bg-white dark:bg-gray-800  rounded-lg  ">
          {/* Category Icon */}
          {cate.map((cat, index) => (
            <>
              {(cat.name === category.name) ? <div className="text-4xl mb-4">{cat.icon}</div> :<></>}

            </>
          ))}
          {/* Category Name */}
          <h3 className="text-lg font-medium text-gray-900 dark:text-stone-400">{category.name}</h3>

        </Link>
      ))}
    </div>
  </div>
  );
};

export default ProductCategories;
