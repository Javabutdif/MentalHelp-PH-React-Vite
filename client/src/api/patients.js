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
};

export const handleRecoverPatient = async (id) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/recover-patient/${id}`,

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

export const sendOtp = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/patient-otp`,
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

export const matchProfessional = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/match-professional`,
      data,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      console.log(response.data.data);
      return response.data.data;
    } else {
      showToast("error", response.data.data);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    showToast("error", error.response.data.message);
    return null;
  }
};

export const requestMatch = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/request-match`,
      data,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      return true;
    } else {
      showToast("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    showToast("error", error.response.data.message);
    return null;
  }
};

//retrieve-match-status/:id

export const retrieveStatus = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/retrieve-match-status/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    console.error("Error:", error.response.data.message);
    return null;
  }
};

export const cancelMatch = async (id) => {
  try {
    const response = await axios.delete(
      `${Server_Connection()}/api/cancel-match-status/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
    } else {
      showToast("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    showToast("error", error.response.data.message);
    return null;
  }
};

export const upload_picture = async (data, id) => {
  const formData = new FormData();
  formData.append("profileImage", data);

  try {
    const response = await axios.post(
      `${Server_Connection()}/api/upload-picture-patient/${id}`,
      formData,
      {
        headers: {
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

export const getNotification = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-notification-patient/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    console.error("Error:", error.response.data.message);
    return null;
  }
};

export const retrieveSchedule = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-appointments/${id}"`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
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

export const retrieveScheduleActive = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-appointments-active/${id}"`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
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

export const setAppointmentStatus = async (id) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/set-appointments-status/${id}"`,

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

//sendMessage

export const sendMessage = async (data, id) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/send-message-patient/${id}`,
      data,
      {
        headers: {
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

export const fetchMessage = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-message/${id}"`,

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

export const handleSetRating = async (rating, id) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/set-rating-patients/${id}`,
      { rating },
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

//get-feedback-patients

export const fetchFeedbackPatients = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-feedback-patients`,

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
      showToast("error", response.data.message);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    showToast("error", error.response.data.message);
    return null;
  }
};

export const changeSchedule = async (id) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/change-schedule/${id}"`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      return true;
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
