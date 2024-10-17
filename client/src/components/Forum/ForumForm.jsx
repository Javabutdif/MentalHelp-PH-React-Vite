import React, { useState } from "react";

const ForumForm = ({ onCreateForum }) => {
	const [title, setTitle] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title) {
			onCreateForum(title);
			setTitle("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Forum Title"
				className="border p-2 rounded mr-2"
				required
			/>
			<button type="submit" className="bg-blue-500 text-white p-2 rounded">
				Create Forum
			</button>
		</form>
	);
};

export default ForumForm;
