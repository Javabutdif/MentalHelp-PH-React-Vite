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
