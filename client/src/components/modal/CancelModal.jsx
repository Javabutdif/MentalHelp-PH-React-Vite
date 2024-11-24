import React, { useState } from "react";

const CancelModal = ({ onSubmit, onClose }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason); 
      onClose(); 
    } else {
      alert("Please provide a reason for cancellation.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">Cancel Request</h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Please provide a reason for cancellation..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
