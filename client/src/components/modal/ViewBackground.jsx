import React from "react";

const ViewBackground = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="max-w-md w-full p-5 bg-white shadow-lg rounded-lg relative">
        {" "}
        <button
          onClick={onClose}
          className="text-gray-500 text-2xl hover:text-gray-800 focus:outline-none mb-4"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-4">
          {data.photo && (
            <img
              src={data.photo}
              alt={`${data.firstname} ${data.lastname}`}
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2 object-cover"
            />
          )}
          <h1 className="text-xl font-semibold">{`${data.firstname} ${data.lastname}`}</h1>
          <p className="text-gray-500">{data.type}</p>
          <p className="text-gray-500">
            <strong>Specialization: </strong>
            {data.specialization}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Contact Information</h2>
          <p>Email: {data.email}</p>
          <p>Contact Number: {data.contact_number}</p>
          <p>Address: {data.professional_address}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Professional Details</h2>

          <p>License: {data.license}</p>
          <p>Experience: {data.experience} years</p>

          <p>Ratings: {data.ratings}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Comments</h2>
          <p>{data.comments || "No comments available."}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBackground;
