import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";


export const admin_register = async (admin_data) => {
    try {
			const response = await axios.post(
				`${Server_Connection()}/api/admin-register`,
				admin_data,
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


export const patient_register = async (patient_data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/patient-register`,
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
//professional-register
export const professional_register = async (professional_data) => {
	try {
		const response = await axios.post(
			`${Server_Connection()}/api/professional-register`,
			professional_data,
			{
				headers: {
					"Content-Type": "application/json",
					"Content-Type": "multipart/form-data",
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