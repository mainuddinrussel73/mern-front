import React from "react";

// Sample review data (this could be fetched from an API)
const reviews = [
  {
    id: 1,
    name: "Md. Rafiq",
    role: "CEO, Company Inc.",
    review: "Great service, very professional and efficient. Highly recommended!",
    rating: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    id: 2,
    name: "Tania Hossain",
    role: "Marketing Head, ABC Corp.",
    review: "Amazing experience! The team was professional, and the results exceeded our expectations.",
    rating: 4,
    imageUrl: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 3,
    name: "Tania Hossain",
    role: "Marketing Head, ABC Corp.",
    review: "Amazing experience! The team was professional, and the results exceeded our expectations.",
    rating: 4,
    imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
  },
  
  // Add more reviews as needed
];

// Star component to display the rating
const StarRating = ({ rating }) => {
  const fullStar = (
    <svg
      className="w-5 h-5 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.569 4.822h5.073c.969 0 1.371 1.24.588 1.81l-4.106 2.982 1.57 4.821c.3.921-.755 1.688-1.54 1.18L10 13.963l-4.105 2.98c-.784.508-1.84-.259-1.54-1.18l1.57-4.82L1.82 9.56c-.784-.57-.38-1.81.588-1.81h5.073L9.05 2.926z" />
    </svg>
  );

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) =>
        index < rating ? fullStar : <div className="w-5 h-5 text-gray-300"></div>
      )}
    </div>
  );
};

// Main Review component
const ClientReviews = () => {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 py-12">
      <div className="  mx-auto px-6">
        <h2 className="text-gray-900 dark:text-stone-100 text-3xl font-bold text-center mb-8">Client Reviews</h2>
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white  dark:bg-gray-800  rounded-lg p-6 transition transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full"
                  src={review.imageUrl}
                  alt={review.name}
                />
                <div>
                  <h3 className="text-gray-900 dark:text-stone-400 text-xl font-semibold ">
                    {review.name}
                  </h3>
                  <p className="text-gray-800 dark:text-stone-300 ">{review.role}</p>
                </div>
              </div>
              <p className="mt-4 dark:text-stone-200 text-gray-600">{review.review}</p>
              <div className="mt-4">
                <StarRating rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
