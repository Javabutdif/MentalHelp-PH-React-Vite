import React, { useState } from "react";

const Experience = ({ isOpen, setIsOpen, finalRating, onSubmit }) => {
  const [rating, setRating] = useState(0);

  // Function to handle rating selection
  const handleRatingSelect = (value) => {
    setRating(value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    finalRating(rating); // Pass the rating to the parent component's onSubmit function
    onSubmit(true);
    setIsOpen(false); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Rate Your Experience
        </h2>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingSelect(star)}
              className={`w-8 h-8 ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Experience;
