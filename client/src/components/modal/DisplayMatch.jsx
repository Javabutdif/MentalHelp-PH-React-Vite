import React, { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import ViewBackground from "./ViewBackground";

const DisplayMatch = ({ onRequestMatch, onSearch, data, onClose }) => {
  const [viewConfirm, setConfirm] = useState(false);
  const [viewBackground, setViewBackground] = useState(false);

  const handleConfirmModal = () => {
    setConfirm(true);
  };
  const handleHideConfirmModal = () => {
    setConfirm(false);
  };

  const handleViewBackground = () => {
    setViewBackground(true);
  };
  const handleHideViewBackground = () => {
    setViewBackground(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <p className="text-xl font-bold">YOU ARE MATCHED WITH</p>
          <div className="flex justify-center my-4">
            <img
              src={!data.photo ? "https://via.placeholder.com/100" : data.photo}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
          </div>
          <p className="text-xl font-semibold">
            Dr. {data.firstname + " " + data.lastname}
          </p>
          <a
            onClick={handleViewBackground} // Call the function directly
            className="text-blue-500 hover:underline"
          >
            View Background
          </a>
          <div>
            <p className="font-semibold">₱ {data.service_fee}.00</p>
          </div>
          <div className="flex justify-center items-center my-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="ml-2 text-gray-500">4.5 out of 5</span>
          </div>

          <div className="flex justify-around mt-6">
            <button
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-full"
              onClick={onSearch}
            >
              Search
            </button>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full"
              onClick={handleConfirmModal}
            >
              Request Match
            </button>
          </div>
        </div>

        <button
          className="mt-4 text-gray-500 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {viewConfirm && (
        <>
          <ConfirmationModal
            type="Request"
            person="Professional"
            onSubmit={onRequestMatch}
            onCancel={handleHideConfirmModal}
          />
        </>
      )}
      {viewBackground && (
        <>
          <ViewBackground data={data} onClose={handleHideViewBackground} />
        </>
      )}
    </div>
  );
};

export default DisplayMatch;
