import { React, useState, useEffect } from "react";
import ForumForm from "./Forum/ForumForm";
import ForumList from "./Forum/ForumList";
import ForumModal from "./Forum/ForumModal";
import { createForum, getForum } from "../api/community";
import ForumPage from "./Forum/ForumPage";

const Community = () => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      const result = await getForum();
      if (result && result.length > 0) {
        setForums(result);
      } else {
        setForums([]);
        state;
        setError("No forums available at the moment.");
      }
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("An error occurred while fetching forums.");
      message;
    }
  };

  const handleCreateForum = async (title) => {
    await createForum(title);
    fetchCommunity();
  };

  const handleForumClick = (title) => {
    setSelectedForum(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForum(null);
  };

  return (
    <div className="container mx-auto p-4 pt-28">
      <ForumForm onCreateForum={handleCreateForum} />
      {error && <div className="text-red-500">{error}</div>}{" "}
      <div>
        <ForumList forums={forums} onForumClick={handleForumClick} />
      </div>
      {isModalOpen && <ForumPage data={selectedForum} onClose={closeModal} />}
    </div>
  );
};

export default Community;
