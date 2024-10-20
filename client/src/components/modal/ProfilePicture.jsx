import React, { useState } from "react";
import { upload_picture } from "../../api/patients";
import { getInformationData } from "../../authentication/authentication";
import { upload_picture_professional } from "../../api/professionals";

const ProfilePicture = ({ onSubmit, onCancel, type }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const user = getInformationData();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(`Selected file: ${selectedFile.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    if (type === "Patient") {
      await upload_picture(file, user.id);
    }
    if (type === "Professional") {
      await upload_picture_professional(file, user.id);
    }

    setMessage(
      "File is ready to be uploaded. Implement the upload logic here."
    );
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-md mx-auto my-4 p-6 border rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload Profile Picture</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Prepare Upload
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-2"
          >
            Cancel
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePicture;
