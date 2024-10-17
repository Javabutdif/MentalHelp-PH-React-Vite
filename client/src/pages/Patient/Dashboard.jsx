import { React, useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GrConnect } from "react-icons/gr";
import { FaPeoplePulling } from "react-icons/fa6";
import { getInformationData } from "../../authentication/authentication";
import MatchType from "../../components/modal/MatchType";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const data = getInformationData();
	const [matchModal, setMatchModal] = useState(false);

	const handleMatchModal = () => {
		setMatchModal(true);
	};
	const handleHideMatchModal = () => {
		setMatchModal(false);
	};

	return (
		<div className="bg-gray-100 min-h-screen p-6 pt-28">
			<header className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<IoPersonSharp className="text-2xl" />
					<h1 className="ml-4 text-xl font-semibold">HELLO {data.name} 👋</h1>
				</div>
				<div className="bg-gray-200 p-2 rounded-lg text-sm">
					<p>30% DISCOUNT ON FIRST SESSION</p>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Match Status */}
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="font-semibold mb-4">Match Status</h2>
					<div className="space-y-2">
						<MatchStatus name="Dr. Masaya" status="Pending" />
						<MatchStatus name="Dr. Hyahay" status="Accepted" />
						<MatchStatus name="Dr. Hyahay" status="Accepted" />
					</div>
				</div>

				{/* Want Someone to Talk To */}
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="font-semibold mb-4">Want someone to talk to?</h2>
					<div className="grid grid-cols-2 gap-4">
						<button
							className="bg-green-600 hover:bg-green-400 text-white p-4 rounded-lg text-center flex flex-col items-center justify-center"
							onClick={handleMatchModal}>
							<GrConnect className="text-2xl mb-2" />
							<p>Match</p>
						</button>

						<Link
							to="/patient/community"
							className="bg-green-600 hover:bg-green-400 text-white p-4 rounded-lg text-center flex flex-col items-center justify-center">
							<IoIosPeople className="text-3xl mb-2" />
							<p>Community Forum</p>
						</Link>
					</div>
				</div>

				{/* Task */}
				<div className="bg-green-100 p-4 rounded-lg shadow">
					<h2 className="font-semibold mb-4">Task</h2>
					<ul className="list-disc pl-5 space-y-1">
						<li>Pray</li>
						<li>Exercise</li>
						<li>Make an entry in your journal</li>
						<li>Read a book</li>
						<li>Meditate</li>
					</ul>
				</div>

				{/* History */}
				<div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
					<h2 className="font-semibold mb-4">History</h2>
					<table className="w-full text-left border-collapse">
						<thead>
							<tr>
								<th className="border-b p-2">Date</th>
								<th className="border-b p-2">Name</th>
								<th className="border-b p-2">Type</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border-b p-2">08-05-2024</td>
								<td className="border-b p-2">Dr. Hyahay</td>
								<td className="border-b p-2">Psychologist</td>
							</tr>
							<tr>
								<td className="border-b p-2">06-05-2024</td>
								<td className="border-b p-2">Dr. Hyahay</td>
								<td className="border-b p-2">Psychologist</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="font-semibold mb-4">Metric Stats</h2>
					<div className="flex justify-between">
						<div className="bg-blue-200 w-8 h-20" />
						<div className="bg-blue-200 w-8 h-16" />
						<div className="bg-blue-200 w-8 h-24" />
						<div className="bg-blue-200 w-8 h-28" />
						<div className="bg-blue-200 w-8 h-12" />
					</div>
					<p className="text-sm text-gray-600 mt-2">Positive & Negative</p>
				</div>
			</div>
			{matchModal && (
				<>
					<MatchType onClose={handleHideMatchModal} />
				</>
			)}
		</div>
	);
};

const MatchStatus = ({ name, status }) => {
	return (
		<div className="flex justify-between items-center border-b py-2">
			<p>{name}</p>
			<p
				className={`font-semibold ${
					status === "Accepted" ? "text-green-500" : "text-red-500"
				}`}>
				{status}
			</p>
		</div>
	);
};

export default Dashboard;
