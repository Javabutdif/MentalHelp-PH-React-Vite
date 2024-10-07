import React, { useState, useEffect } from "react";
import {
	getAllActiveProfessionals,
	getAllPendingProfessionals,
} from "../../api/professionals";
import ButtonsComponent from "../../components/Custom/ButtonsComponent";
import FormButton from "../../components/Forms/FormButton";
import TableComponent from "../../components/Custom/TableComponent";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

function Professional() {
	const [activeData, setActiveData] = useState([]);
	const [pendingData, setPendingData] = useState([]);
	const [allTable, setAllTable] = useState(true);
	const [pendingTable, setPendingTable] = useState(false);
	const [data, setData] = useState([]);

	const showAllTable = () => {
		setData(activeData);
	};
	const showPendingTable = () => {
		setData(pendingData);
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
	const columns = [
		{
			key: "professional_id",
			label: "ID",
			selector: (row) => row.professional_id, // Return value
			sortable: true,
			cell: (row) => (
				<div className="text-xs">
					<div>{row.professional_id}</div>
				</div>
			),
		},
		{
			key: "firstname",
			label: "First Name",
			selector: (row) => row.firstname,
			sortable: true,
		},
		{
			key: "lastname",
			label: "Last Name",
			selector: (row) => row.lastname,
			sortable: true,
		},
		{
			key: "email",
			label: "Email Account",
			selector: (row) => row.email,
			sortable: true,
		},
		{
			key: "contact_number",
			label: "Contact Number",
			selector: (row) => row.contact_number,
			sortable: true,
		},
		{
			key: "type",
			label: "Profession",
			selector: (row) => row.type,
			sortable: true,
		},
		{
			key: "license",
			label: "License",
			selector: (row) => row.license,
			sortable: true,
		},
		{
			key: "experience",
			label: "Experience",
			selector: (row) => row.experience, // Fixed typo here
		},
		{
			key: "professional_status",
			label: "Status",
			selector: (row) => row.professional_status,
			cell: (row) => (
				<div className="text-center">
					<span
						className={`px-2 py-1 rounded text-xs ${
							row.professional_status === "Accepted"
								? "bg-green-200 text-green-800"
								: "bg-yellow-200 text-yellow-800"
						}`}>
						{row.professional_status}
					</span>
				</div>
			),
		},
		{
			key: "actions",
			label: "Actions",

			cell: (row) => (
				<ButtonsComponent>
					{row.professional_status === "Accepted" ? (
						<>
							<FormButton
								type="button"
								text="View"
								icon={<FaEye />}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Edit"
								icon={<FaEdit />}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-blue-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Delete"
								icon={<FaTrash />}
								styles="flex items-center space-x-2 bg-gray-200 text-red-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
								textClass="text-red-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
						</>
					) : (
						<>
							<FormButton
								type="button"
								text="View"
								icon={<FaEye />}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Accept"
								icon={<FaEdit />}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Decline"
								icon={<FaTrash />}
								styles="flex items-center space-x-2 bg-gray-200 text-red-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
								textClass="text-red-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
						</>
					)}
				</ButtonsComponent>
			),
		},
	];

	return (
		<div className="pt-20">
			<div className="container pt-5 px-5">
				<ButtonsComponent>
					<FormButton
						type="button"
						text="All Professionals"
						onClick={() => showAllTable()}
						icon={<i className="fas fa-edit" />} // Simple icon
						styles="flex items-center space-x-2 bg-green-600 text-white rounded-md px-3 py-1.5 transition duration-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white-400"
						textClass="text-white" // Elegant text color
						whileHover={{ scale: 1.02, opacity: 0.95 }}
						whileTap={{ scale: 0.98, opacity: 0.9 }}
					/>
					<FormButton
						type="button"
						text="Pending Professionals"
						onClick={() => showPendingTable()}
						icon={<i className="fas fa-edit" />} // Simple icon
						styles="flex items-center space-x-2 bg-green-600  text-white rounded-md px-3 py-1.5 transition duration-150 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
						textClass="text-white" // Elegant text color
						whileHover={{ scale: 1.02, opacity: 0.95 }}
						whileTap={{ scale: 0.98, opacity: 0.9 }}
					/>
				</ButtonsComponent>
			</div>

			<TableComponent columns={columns} data={data} />
		</div>
	);
}

export default Professional;
