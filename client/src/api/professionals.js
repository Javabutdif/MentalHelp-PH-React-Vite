import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";

//get-count-pending-professional

export const getCountActiveProfessionals = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-count-active-professional`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const getCountPendingProfessionals = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-count-pending-professional`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};
//get-all-active-professional
//get-all-pending-professional

//Active
export const getAllActiveProfessionals = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-all-active-professional`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

//Pending
export const getAllPendingProfessionals = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-all-pending-professional`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};
export const getAllDeclineProfessionals = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-count-decline-professional`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const sendOtp = async (data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/professional-otp`,
			data,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
			console.log(response.data);
			return response.data.otp;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const acceptProfessional = async (id) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/accept-professional/${id}`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const declineProfessional = async (data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/decline-professional`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const deleteProfessional = async (id) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/delete-professional/${id}`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};

export const recoverProfessional = async (id) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/recover-professional/${id}`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};


//For edit purpose
export const retrieveSpecificProfessional = async (id) => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-specific-professional/${id}`,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data.data;
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};


//Edit Professionals

export const editProfessional = async (professional_data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/update-professional`,
			professional_data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			showToast("success", response.data.message);
		} else {
			showToast("error", response.data.message);
		}
		console.log(response.data.message);
	} catch (error) {
		console.error("Error:", error.response.data.message);
		showToast("error", error.response.data.message);
		return null;
	}
};
