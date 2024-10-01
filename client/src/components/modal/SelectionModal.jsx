import React from "react";

function SelectionModal({ professionalClick, patientClick, onCancel }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
				onClick={onCancel}></div>

			<div className="bg-white rounded-xl shadow-xl min-w-96 md:min-w-[450px] w-fit z-10 overflow-hidden transform transition-all duration-300 scale-95">
				<div
					className={`flex justify-between items-center p-5  text-black rounded-t-xl shadow-md`}>
					<h5 className="text-xl font-primary font-bold">Prompt</h5>
					<button
						type="button"
						className="text-3xl leading-none hover:text-gray-200 focus:outline-none"
						aria-label="Close"
						onClick={onCancel}>
						&times;
					</button>
				</div>

				<div className="p-6 space-y-4 font-secondary text-lg bg-gray-50 text-gray-800 text-center">
					<p>Would you like to register as a</p>
				</div>

				<div className="flex items-center justify-end p-6 bg-white border-t border-gray-200 rounded-b-xl">
					<button
						type="button"
						className="px-5 text-white py-2  hover:text-white-700 transition-all focus:outline-none rounded-md bg-green-500 border border-gray-300 hover:border-gray-400"
						onClick={professionalClick}>
						Psychologist/Psychiatrist?
					</button>
					<button
						type="button"
						className={`ml-3 px-6 py-2 text-white rounded bg-blue-500 `}
						onClick={patientClick}>
						Patient?
					</button>
				</div>
			</div>
		</div>
	);
}

export default SelectionModal;
