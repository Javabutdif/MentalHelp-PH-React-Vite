import React from "react";

const ForumList = ({ forums, onForumClick }) => {
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Forums:</h2>
			<ul className="list-disc list-inside">
				{forums.map((forum, index) => (
					<li key={index}>
						<button
							onClick={() => onForumClick(forum)}
							className="text-blue-500 underline cursor-pointer">
							{forum}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ForumList;
