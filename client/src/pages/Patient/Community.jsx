import { React, useState } from "react";
import ForumForm from "../../components/Forum/ForumForm";
import ForumList from "../../components/Forum/ForumList";
import ForumModal from "../../components/Forum/ForumModal";

const Community = () => {
	const [forums, setForums] = useState([]);
	const [selectedForum, setSelectedForum] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCreateForum = (title) => {
		setForums([...forums, title]);
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
			<h1 className="text-2xl font-bold mb-4">Community Forum</h1>
			<ForumForm onCreateForum={handleCreateForum} />
			<ForumList forums={forums} onForumClick={handleForumClick} />
			{isModalOpen && <ForumModal title={selectedForum} onClose={closeModal} />}
		</div>
	);
};

export default Community;
