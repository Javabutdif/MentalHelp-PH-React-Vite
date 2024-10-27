import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";

//Create Forum
export const createForum = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/create-forum`,
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

//Fetch Forum

export const getForum = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-forum`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      console.log("error", response.data.message);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    console.log("error", error.response.data.message);
    return null;
  }
};

//getConversation

export const getConversation = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-conversation`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      console.log("error", response.data.message);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    console.log("error", error.response.data.message);
    return null;
  }
};
