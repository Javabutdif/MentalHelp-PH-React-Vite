import React, { useState } from "react";
import SelectionModal from "../components/modal/SelectionModal";
import ProfessionalRegister from "../components/modal/ProfessionalRegister";

function Landing() {
	const [showModal, setShowModal] = useState(false);
	const [professionalModal, setProfessionalModal] = useState(false);
	const [patientModal, setPatientModal] = useState(false);

	const showTriggerModal = () => {
		setShowModal(true);
	};
	const hideTriggerModal = () => {
		setShowModal(false);
	};
	const showProfessionalModal = () => {
		setShowModal(false);
		setProfessionalModal(true);
	};
	const hideProfessionalModal = () => {
		setProfessionalModal(false);
	};
	const showPatientModal = () => {
		setShowModal(false);
		setPatientModal(true);
	};
	const hidePatientModal = () => {
		setPatientModal(false);
	};

	return (
		<div className="mt-16 pt-16 container mx-auto">
			<div className="flex flex-wrap">
				<div className="w-full md:w-1/2 p-5 pt-20">
					<h1 className="mb-5 text-3xl font-bold">
						The strongest people are not those who show strength in front of us
						but those who win battles we know nothing about.
					</h1>
					<div className="flex flex-row gap-4 text-center">
						<button
							className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
							type="button"
							onClick={showTriggerModal}>
							Get Started
						</button>
						<button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded">
							Login
						</button>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<img
						className="img-fluid img-start w-full h-auto"
						src="/mh.png"
						alt="MentalHelp Image"
					/>
				</div>
			</div>

			<div className="mt-5">
				<p className="text-gray-700 text-xl pt-2">
					Your emotions are important to us! MentalHelp Ph offers effective
					tools and programs designed to empower you in managing feelings of
					depression, anxiety, or stress. Developed by renowned experts with
					extensive experience in positive psychology, mindfulness, and
					cognitive behavioral therapy, our techniques are grounded in
					evidence-based interventions.
				</p>
			</div>

			{showModal && (
				<SelectionModal
					professionalClick={showProfessionalModal}
					patientClick={showPatientModal}
					onCancel={hideTriggerModal}
				/>
			)}
			{professionalModal && (
				<ProfessionalRegister onCancel={hideProfessionalModal} />
			)}
		</div>
	);
}

export default Landing;
