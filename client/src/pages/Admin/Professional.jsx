import React, { useState, useEffect } from "react";
import {
	getAllActiveProfessionals,
	getAllPendingProfessionals,
	acceptProfessional,
	declineProfessional,
	deleteProfessional,
	recoverProfessional,
} from "../../api/professionals";
import ButtonsComponent from "../../components/Custom/ButtonsComponent";
import FormButton from "../../components/Forms/FormButton";
import TableComponent from "../../components/Custom/TableComponent";
import { FaEdit, FaTrash, FaEye, FaBriefcase } from "react-icons/fa";
import ViewModal from "../../components/modal/ViewModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import LoadingScreen from "../../Loader/LoadingScreen";
import ProfessionalRegister from "../../components/modal/ProfessionalRegister";

function Professional() {
	const [activeData, setActiveData] = useState([]);
	const [pendingData, setPendingData] = useState([]);
	const [selectData, setSelectData] = useState([]);
	const [activeTable, setActiveTable] = useState(true);
	const [data, setData] = useState([]);
	const [viewModal, setViewModal] = useState(false);
	const [acceptModal, setAcceptModal] = useState(false);
	const [declineModal, setDeclineModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [recoverModal, setRecoverModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [acceptId, setAcceptId] = useState("");
	const [declineData, setDeclineData] = useState("");
	const [deleteId, setDeleteId] = useState("");
	const [recoverId, setRecoverId] = useState("");
	const [editId, setEditId] = useState("");
	const [loading, setLoading] = useState(false);

	const showAllTable = () => {
		setData(activeData);
	};
	const showPendingTable = () => {
		setData(pendingData);
		setActiveTable(false);
	};

	const fetchActiveData = async () => {
		setLoading(true);
		const result = await getAllActiveProfessionals();
		setActiveData(result);
		setData(activeData);
		setLoading(false);
	};
	const fetchPendingData = async () => {
		setLoading(true);
		const result = await getAllPendingProfessionals();
		setPendingData(result);
		setLoading(false);
	};
	useEffect(() => {
		fetchActiveData();
		fetchPendingData();
		showAllTable();
	}, []);

	const handleAcceptData = async () => {
		await acceptProfessional(acceptId);
		setAcceptModal(false);
		fetchActiveData();
		fetchPendingData();
	};
	const handleDeclineData = async () => {
		await declineProfessional(declineData);
		handleHideDeclineModal();
		fetchActiveData();
		fetchPendingData();
	};

	const handleViewModal = (data) => {
		setViewModal(true);
		setSelectData(data);
	};
	const handleHideModal = () => {
		setViewModal(false);
	};

	const handleAcceptModal = (id) => {
		setAcceptModal(true);
		setAcceptId(id);
	};
	const handleHideAcceptModal = () => {
		setAcceptModal(false);
	};

	const handleDeclineModal = (data) => {
		setDeclineData(data);
		console.log(declineData);
		setDeclineModal(true);
	};
	const handleHideDeclineModal = () => {
		setDeclineModal(false);
	};

	const handleDeleteModal = (id) => {
		setDeleteModal(true);
		setDeleteId(id);
		console.log(deleteId);
	};
	const handleHideDeleteModal = () => {
		setDeleteModal(false);
	};

	const handleDeleteProfessionals = async () => {
		await deleteProfessional(deleteId);
		handleHideDeleteModal();
		fetchActiveData();
		fetchPendingData();
	};

	const handleRecoverModal = (id) => {
		setRecoverModal(true);
		setRecoverId(id);
	};
	const handleHideRecoverModal = () => {
		setRecoverModal(false);
	};
	const handleRecoverProfessional = async () => {
		await recoverProfessional(recoverId);
		handleHideRecoverModal();
		fetchActiveData();
		fetchPendingData();
	};

	const handleEditModal = (id) => {
		setEditModal(true);
		setEditId(id);
	};
	const handleHideEditModal = () => {
		setEditModal(false);
		setEditId("");
		fetchActiveData();
		fetchPendingData();
	};

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
								: row.professional_status === "Delete"
								? "bg-red-200 text-red-800"
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
								onClick={() => handleViewModal(row)}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Edit"
								icon={<FaEdit />}
								onClick={() => handleEditModal(row.professional_id)}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-blue-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Delete"
								icon={<FaTrash />}
								onClick={() => handleDeleteModal(row.professional_id)}
								styles="flex items-center space-x-2 bg-gray-200 text-red-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
								textClass="text-red-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
						</>
					) : row.professional_status === "Pending" ? (
						<>
							<FormButton
								type="button"
								text="View"
								icon={<FaEye />}
								onClick={() => handleViewModal(row)}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Accept"
								icon={<FaEdit />}
								onClick={() => {
									handleAcceptModal(row.professional_id);
								}}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Decline"
								icon={<FaTrash />}
								onClick={() => handleDeclineModal(row)}
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
								onClick={() => handleViewModal(row)}
								styles="flex items-center space-x-2 bg-gray-200 text-gray-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
								textClass="text-gray-800"
								whileHover={{ scale: 1.02, opacity: 0.95 }}
								whileTap={{ scale: 0.98, opacity: 0.9 }}
							/>
							<FormButton
								type="button"
								text="Recover"
								onClick={() => handleRecoverModal(row.professional_id)}
								icon={<FaBriefcase />}
								styles="flex items-center space-x-2 bg-gray-200 text-green-800 rounded-md px-3 py-1.5 transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
								textClass="text-green-800"
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
		<>
			{loading ? (
				<>
					<div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
						<LoadingScreen />
					</div>
				</>
			) : (
				<>
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
						{viewModal && (
							<ViewModal data={selectData} onCancel={handleHideModal} />
						)}
						{acceptModal && (
							<ConfirmationModal
								type="Accept"
								person="Professional"
								onCancel={handleHideAcceptModal}
								onSubmit={handleAcceptData}
							/>
						)}
						{declineModal && (
							<ConfirmationModal
								type="Decline"
								person="Professional"
								onCancel={handleHideDeclineModal}
								onSubmit={handleDeclineData}
							/>
						)}
						{deleteModal && (
							<ConfirmationModal
								type="Delete"
								person="Professional"
								onCancel={handleHideDeleteModal}
								onSubmit={handleDeleteProfessionals}
							/>
						)}
						{recoverModal && (
							<ConfirmationModal
								type="Recover"
								person="Professional"
								onCancel={handleHideRecoverModal}
								onSubmit={handleRecoverProfessional}
							/>
						)}
						{editModal && (
							<>
								<ProfessionalRegister
									onCancel={handleHideEditModal}
									type="EditProfessional"
									id={editId}
								/>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default Professional;
