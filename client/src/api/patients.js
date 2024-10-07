import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";

export const getCountPatients = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-count-patients`,

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

///get-all-patient

export const getAllPatients = async () => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-all-patient`,

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

//For edit purpose
export const retrieveSpecificPatient = async (id) => {
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/get-specific-patient/${id}`,

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

//Edit Patient

export const editPatient = async (patient_data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/update-patient`,
			patient_data,
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

export const handleDeletePatient = async (id) => {

	try {
		const response = await axios.post(
			`${Server_Connection()}/api/delete-patient/${id}`,
			

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
}

