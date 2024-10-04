import React from "react";
import { FaUserMd, FaUserCheck, FaUserClock } from "react-icons/fa";

const DashboardCard = ({
	patientsCount,
	activeProfessionalsCount,
	pendingProfessionalsCount,
}) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4">
			<h2 className="text-xl font-semibold text-gray-700">Dashboard Summary</h2>

			<div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg shadow">
				<div className="flex items-center space-x-3">
					<FaUserMd className="text-blue-500 text-2xl" />
					<span className="text-gray-700 font-medium">Number of Patients</span>
				</div>
				<span className="text-2xl font-bold text-gray-800">
					{patientsCount}
				</span>
			</div>

			<div className="flex items-center justify-between bg-green-100 p-4 rounded-lg shadow">
				<div className="flex items-center space-x-3">
					<FaUserCheck className="text-green-500 text-2xl" />
					<span className="text-gray-700 font-medium">
						Active Professionals
					</span>
				</div>
				<span className="text-2xl font-bold text-gray-800">
					{activeProfessionalsCount}
				</span>
			</div>

			<div className="flex items-center justify-between bg-yellow-100 p-4 rounded-lg shadow">
				<div className="flex items-center space-x-3">
					<FaUserClock className="text-yellow-500 text-2xl" />
					<span className="text-gray-700 font-medium">Pending Activations</span>
				</div>
				<span className="text-2xl font-bold text-gray-800">
					{pendingProfessionalsCount}
				</span>
			</div>
		</div>
	);
};

export default DashboardCard;
