import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import PatientRegister from "../../components/modal/PatientRegister";
import { retrieveSpecificPatient } from "../../api/patients";
const Profile = () => {
	const user = getInformationData();
	const [data, setData] = useState([]);
	const [editModal, setEditModal] = useState(false);
	console.log(data);
	useEffect(() => {
		const fetchData = async () => {
			const data = await retrieveSpecificPatient(user.id);
			setData(data[0]);
		};
		fetchData();
	}, []);
	const handleEditModal = () => {
		setEditModal(true);
	};
	const handHideEditModal = () => {
		setEditModal(false);
		window.location.reload();
	};

	return (
		<>
			<div className="">
				<img
					src="/header.jpg"
					alt="Header"
					className="w-full h-56 object-cover"
				/>
				<div className="mx-20 mt-10 flex flex-row gap-8 text-left">
					{/* Left Column: Profile Picture */}
					<div className="flex flex-col items-center w-1/2">
						<img
							src="/dione.jpg"
							className="rounded-full object-cover h-36 w-36"
							alt="Profile"
						/>
						<button className="mt-4 border px-4 py-2">Edit Profile</button>
					</div>

					{/* Right Column: Information */}
					<div className="flex flex-col w-1/2">
						<h2 className="text-xl font-bold">
							{data.firstname + " " + data.lastname}{" "}
						</h2>
						<p className="text-gray-700">Bio: {data.bio}</p>
						<p className="text-gray-700">Gender: {data.gender}</p>
						<p className="text-gray-700">Age: {data.age}</p>
						<p className="text-gray-700">Email: {data.email}</p>
						<p className="text-gray-700">Phone: {data.contact_number}</p>
						<p className="text-gray-700">Address: {data.addresses}</p>
						<button onClick={handleEditModal} className="mt-4 border px-4 py-2">
							Edit Information
						</button>
					</div>
				</div>
				{editModal && (
					<>
						<PatientRegister
							type="Edit"
							id={data.patient_id}
							onCancel={handHideEditModal}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default Profile;
