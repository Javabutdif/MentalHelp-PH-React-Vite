import React, { useState, useEffect } from "react";
import {
	getAllActiveProfessionals,
	getAllPendingProfessionals,
} from "../../api/professionals";
import ButtonsComponent from "../../components/Custom/ButtonsComponent";
import FormButton from "../../components/Forms/FormButton";

function Professional() {
	const [activeData, setActiveData] = useState([]);
	const [pendingData, setPendingData] = useState([]);
	const [allTable, setAllTable] = useState(true);
	const [pendingTable, setPendingTable] = useState(false);

	const showAllTable = () => {
		//Have a table component render when showing all the buttons
	};

	useEffect(() => {
		const fetchActiveData = async () => {
			const result = await getAllActiveProfessionals();
			setActiveData(result);
		};
		const fetchPendingData = async () => {
			const result = await getAllPendingProfessionals();
			setPendingData(result);
		};

		fetchActiveData();
		fetchPendingData();
	}, []);

	return (
		<div className="pt-20">
			<div className="container pt-5 px-5">
				<ButtonsComponent>
					<FormButton
						type="button"
						text="All Professionals"
						//onClick={() => handleEditButtonClick(row)}
						icon={<i className="fas fa-edit" />} // Simple icon
						styles="flex items-center space-x-2 bg-green-600 text-white rounded-md px-3 py-1.5 transition duration-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white-400"
						textClass="text-white" // Elegant text color
						whileHover={{ scale: 1.02, opacity: 0.95 }}
						whileTap={{ scale: 0.98, opacity: 0.9 }}
					/>
					<FormButton
						type="button"
						text="Pending Professionals"
						//onClick={() => handleEditButtonClick(row)}
						icon={<i className="fas fa-edit" />} // Simple icon
						styles="flex items-center space-x-2 bg-green-600  text-white rounded-md px-3 py-1.5 transition duration-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
						textClass="text-white" // Elegant text color
						whileHover={{ scale: 1.02, opacity: 0.95 }}
						whileTap={{ scale: 0.98, opacity: 0.9 }}
					/>
				</ButtonsComponent>
			</div>
		</div>
	);
}

export default Professional;
