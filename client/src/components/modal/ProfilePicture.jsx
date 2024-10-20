import React, { useState } from "react";

const ProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(`Selected file: ${selectedFile.name}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    // Here you can handle the file upload logic however you want.
    // This could involve triggering a parent component's function,
    // saving the file locally, etc.

    setMessage(
      "File is ready to be uploaded. Implement the upload logic here."
    );
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 border rounded shadow-lg">
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
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ProfilePicture;
