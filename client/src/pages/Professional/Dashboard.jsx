import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import ProfessionalPreferences from "../../components/modal/ProfessionalPreferences";
import { checkProfessionalPreferences } from "../../api/professionals";


const Dashboard = () => {
	const user = getInformationData();
	const [dataRetrieve, setDataRetrieve] = useState(false);
	useEffect(() => {
		const fetchPreferences = async () => {
            const result = await checkProfessionalPreferences(user.id);
            setDataRetrieve(result);
        };
        fetchPreferences();
	}, []);

	return (
		<div className="container mx-auto p-4 pt-28">
			{!dataRetrieve && (
				<>
					<ProfessionalPreferences />
				</>
			)}

			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center space-x-4">
					<img
						src="/path-to-profile-image"
						alt="Doctor"
						className="w-16 h-16 rounded-full"
					/>
					<div>
						<h1 className="text-2xl font-bold">{user.name}</h1>
						<p className="text-gray-500">{user.type}</p>
					</div>
				</div>
				<div className="flex space-x-4">
					{/* Statistic Cards */}
					<div className="bg-white shadow-md rounded-md p-4">
						<h2 className="text-lg font-semibold">Successful Consultation</h2>
						<p className="text-2xl font-bold">85</p>
						<p className="text-sm text-gray-500">by 5 months</p>
					</div>
					<div className="bg-white shadow-md rounded-md p-4">
						<h2 className="text-lg font-semibold">Earnings</h2>
						<p className="text-2xl font-bold">140K</p>
						<p className="text-sm text-gray-500">by 5 months</p>
					</div>
					<div className="bg-white shadow-md rounded-md p-4">
						<h2 className="text-lg font-semibold">Total Consultation</h2>
						<p className="text-2xl font-bold">116</p>
						<p className="text-sm text-gray-500">by 5 months</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-3 gap-4">
				{/* Appointments Section */}
				<div className="col-span-1">
					<h3 className="font-semibold mb-2">Appointments</h3>
					<div className="space-y-4">
						<div className="bg-orange-100 p-4 rounded-md shadow-md">
							<p className="font-bold">04 July</p>
							<p>1:00 - 2:00</p>
							<p>Monica, 20, Female, Depression</p>
						</div>
						<div className="bg-blue-100 p-4 rounded-md shadow-md">
							<p className="font-bold">04 July</p>
							<p>3:00 - 4:00</p>
							<p>Joana, 20, Female, Depression</p>
						</div>
						<div className="bg-green-100 p-4 rounded-md shadow-md">
							<p className="font-bold">04 July</p>
							<p>5:00 - 6:00</p>
							<p>Yanna, 20, Female, Depression</p>
						</div>
					</div>
				</div>

				{/* Patient History Section */}
				<div className="col-span-2">
					<h3 className="font-semibold mb-2">Patient History</h3>
					<table className="min-w-full bg-white shadow-md rounded-md">
						<thead>
							<tr className="text-left border-b">
								<th className="py-2 px-4">Name</th>
								<th className="py-2 px-4">Age</th>
								<th className="py-2 px-4">Gender</th>
								<th className="py-2 px-4">Condition</th>
								<th className="py-2 px-4">Date</th>
							</tr>
						</thead>
						<tbody>
							{[
								{
									name: "Naomi",
									age: 21,
									gender: "Female",
									condition: "Anxiety",
									date: "02-07-24",
								},
								{
									name: "Randy",
									age: 33,
									gender: "Male",
									condition: "Anxiety",
									date: "02-07-24",
								},
								{
									name: "Krisha",
									age: 18,
									gender: "Female",
									condition: "Depression",
									date: "02-07-24",
								},
							].map((patient, index) => (
								<tr key={index} className="border-b">
									<td className="py-2 px-4">{patient.name}</td>
									<td className="py-2 px-4">{patient.age}</td>
									<td className="py-2 px-4">{patient.gender}</td>
									<td className="py-2 px-4">{patient.condition}</td>
									<td className="py-2 px-4">{patient.date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Match Request Section */}
			<div className="mt-8">
				<h3 className="font-semibold mb-2">Match Request</h3>
				<div className="bg-white shadow-md rounded-md p-4 space-y-4">
					{[
						{
							name: "Sunshine",
							age: 20,
							gender: "Female",
							condition: "Depression",
						},
						{ name: "Marilou", age: 29, gender: "Female", condition: "Stress" },
						{
							name: "Monica",
							age: 13,
							gender: "Female",
							condition: "Depression",
						},
					].map((request, index) => (
						<div
							key={index}
							className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm">
							<div>
								<p>
									{request.name}, {request.age}, {request.gender}
								</p>
								<p>{request.condition}</p>
							</div>
							<button className="bg-green-500 text-white px-4 py-1 rounded-md">
								Accept
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
