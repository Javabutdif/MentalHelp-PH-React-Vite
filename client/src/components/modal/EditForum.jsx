import React, { useEffect, useState } from "react";
import { getForumInformation, setForumEdit } from "../../api/community";

const EditForum = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    id: id,
    title: "",
    description: "",
  });

  const fetchForum = async () => {
    try {
      const result = await getForumInformation(id);
      setFormData({
        id: id,
        title: result[0]?.title || "",
        description: result[0]?.description || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await setForumEdit(formData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchForum();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Edit Forum</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Forum Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter forum title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForum;
