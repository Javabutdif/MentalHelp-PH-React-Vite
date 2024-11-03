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

export const getConversation = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-discussion/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      //console.log(response.data.data);
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

export const sendDiscussion = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/send-discussion`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("success", response.data.message);
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
