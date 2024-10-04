import React from "react";
import { motion } from "framer-motion";

const Pagination = ({
	currentPage,
	totalPages,
	handlePageChange,
	totalItems,
	itemsPerPage,
}) => {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="self-end flex items-center justify-between w-full py-2 px-3">
			<motion.span
				className="text-gray-500 text-sm font-medium"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				{`${startItem}-${endItem} of ${totalItems}`}
			</motion.span>
			<div className="flex items-center space-x-2">
				<motion.button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 ${
						currentPage === 1
							? "bg-gray-100 cursor-not-allowed"
							: "bg-white shadow-sm"
					} transition-transform duration-300 ease-in-out`}
					initial={{ opacity: 0.6 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}>
					<i className="fas fa-chevron-left"></i>
				</motion.button>

				<motion.span
					className="text-gray-600 text-sm font-medium"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}>
					{currentPage} / {totalPages}
				</motion.span>

				<motion.button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 ${
						currentPage === totalPages
							? "bg-gray-100 cursor-not-allowed"
							: "bg-white shadow-sm"
					} transition-transform duration-300 ease-in-out`}
					initial={{ opacity: 0.6 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}>
					<i className="fas fa-chevron-right"></i>
				</motion.button>
			</div>
		</div>
	);
};

export default Pagination;
