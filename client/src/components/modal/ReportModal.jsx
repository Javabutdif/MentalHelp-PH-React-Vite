import React, { useState } from "react";
import { handleReport } from "../../api/patients";

const ReportModal = ({
  patient_id,
  professional_id,
  session_id,
  onSubmit,
  onCancel,
  details,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportDescription, setReportDescription] = useState("");

  // Close modal handler
  const closeModal = () => setIsOpen(false);

  // Open modal handler
  const openModal = () => setIsOpen(true);

  // Submit the report handler (for example, you could send it to an API)
  const handleSubmit = async () => {
    console.log({ patient_id, professional_id, session_id, reportDescription });
    const formData = new FormData();
    formData.append("patient_id", patient_id);
    formData.append("professional_id", professional_id);
    formData.append("session_id", session_id);
    formData.append("reason", reportDescription);

    await handleReport(formData);
    onSubmit();
  };

  return (
    <>
      {/* Trigger Button */}

      {/* Modal Background */}

      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        onClick={closeModal}
      >
        {/* Modal Content */}
        <div
          className="bg-white p-6 rounded-lg w-1/3"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
        >
          <h2 className="text-2xl font-semibold ">Report {details.type}</h2>
          <p className="text-xl font-semibold mb-4">
            Dr.{" "}
            {details.professional_firstname +
              " " +
              details.professional_lastname}
          </p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="5"
            placeholder="Enter the details of the report..."
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
