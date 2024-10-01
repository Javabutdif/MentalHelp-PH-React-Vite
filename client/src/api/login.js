import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";

export const login = async (email, password) => {
	try {
		const payload = {
			email,
			password,
		};

		const response = await axios.post(
			`${Server_Connection()}/api/login`,
			payload,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			const { message } = response.data;

			showToast("success", message || "Signed in successfully");
			return true;
		} else return false;
	} catch (error) {
		if (error.response && error.response.data) {
			showToast("error", error.response.data.message || "An error occurred");
		} else {
			showToast("error", "An error occurred");
		}
		console.error("Error:", error);
	}
};
