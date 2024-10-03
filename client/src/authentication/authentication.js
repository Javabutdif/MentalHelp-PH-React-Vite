import Server_Connection from "../connection/Server_Connection";

export const setAuthentication = async () => {
	let user;
	try {
		const response = await axios.get(
			`${Server_Connection()}/api/protected-route`,
			{
				withCredentials: true,
			}
		);

		if (response.data.data.role === "Admin") {
			user = {
				name: response.data.data.adminName,
				email: response.data.data.adminEmail,
				role: response.data.data.role,
			};
			sessionStorage.setItem("Data", JSON.stringify(user));
		} else if (response.data.data.role === "Student") {
			user = {
				id: response.data.user.id_number,
				course: response.data.user.course,
				name:
					response.data.user.first_name +
					" " +
					response.data.user.middle_name +
					" " +
					response.data.user.last_name,

				position: response.data.user.position,
				year: response.data.user.year,
				rfid: response.data.user.rfid,
				role: response.data.role,
				email: response.data.user.email,
			};

			sessionStorage.setItem("Data", JSON.stringify(user));
		}
	} catch (err) {
		console.log("Authentication");
		console.error("Not authorized:", err);
	}
};
