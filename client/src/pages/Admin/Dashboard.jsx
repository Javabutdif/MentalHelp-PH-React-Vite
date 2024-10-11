import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getCountPatients } from "../../api/patients";
import {
	getCountActiveProfessionals,
	getCountPendingProfessionals,
	getAllDeclineProfessionals,
} from "../../api/professionals";

function Dashboard() {
	const [patientsCount, setPatientCount] = useState("");
	const [activeProfessionalCount, setActiveProfessionalCount] = useState("");
	const [pendingProfessionalsCount, setPendingProfessionalCount] = useState("");
	const [declineProfessionalsCount, setDeclineProfessionalCount] = useState("");

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const patientCount = await getCountPatients();
				const activeCount = await getCountActiveProfessionals();
				const pendingCount = await getCountPendingProfessionals();
				const declineCount = await getAllDeclineProfessionals();

				setPatientCount(patientCount);
				setActiveProfessionalCount(activeCount);
				setPendingProfessionalCount(pendingCount);
				setDeclineProfessionalCount(declineCount);
			} catch (error) {
				console.error("Error fetching patient count:", error);
			}
		};

		fetchCount();
	}, []);

	return (
		<div className="p-8 bg-gray-100 min-h-screen pt-28">
			<DashboardCard
				patientsCount={patientsCount}
				activeProfessionalsCount={activeProfessionalCount}
				pendingProfessionalsCount={pendingProfessionalsCount}
				declinePorfessionalsCount={declineProfessionalsCount}
			/>
		</div>
	);
}

export default Dashboard;
