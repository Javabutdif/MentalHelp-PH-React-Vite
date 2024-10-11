function ViewModal({ data, onCancel }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
				<div className="p-4 border-b flex justify-between items-center">
					<h5 className="text-2xl font-bold text-green-600">Details</h5>
					<button
						type="button"
						className="text-gray-600 hover:text-gray-800"
						onClick={onCancel}>
						&times;
					</button>
				</div>
				<div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
					<div>
						<label className="block text-sm font-medium">First Name</label>
						<p className="mt-1">{data.firstname}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">Last Name</label>
						<p className="mt-1">{data.lastname}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">Contact Number</label>
						<p className="mt-1">{data.contact}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">Email Address</label>
						<p className="mt-1">{data.email}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">Profession Type</label>
						<p className="mt-1">{data.profession}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">
							Years of Experience
						</label>
						<p className="mt-1">{data.experience}</p>
					</div>
					<div>
						<label className="block text-sm font-medium">License Number</label>
						<p className="mt-1">{data.license}</p>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm font-medium">Documents</label>
						<p className="mt-1">
							{data.documents ? data.documents.name : "No document uploaded"}
						</p>
					</div>
					<div className="sm:col-span-2 flex justify-end space-x-2 mt-4">
						<button
							type="button"
							className="border-2 border-red-500 rounded-full text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white"
							onClick={onCancel}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewModal;
