import axios from "axios";
import { showToast } from "../components/utils/alertHelper";
import Server_Connection from "../connection/Server_Connection";
import { CgWindows } from "react-icons/cg";

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

//Retrive Professional Prefenrences and check if it is available or not

export const checkProfessionalPreferences = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/check-professional-preferences/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      console.log("error", response.data.message);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);

    return null;
  }
};

//Update Professional Preferences
export const updateProfessionalPreferences = async (professional_data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/update-professional-preferences`,
      professional_data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      window.location.reload();
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
///download/:filename
export const downloadFile = async (filename) => {
  console.log(filename);
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/download/${filename}`,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast("success", "Downloading File...");
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

export const upload_picture_professional = async (data, id) => {
  const formData = new FormData();
  formData.append("profileImage", data);

  try {
    const response = await axios.post(
      `${Server_Connection()}/api/upload-picture-professional/${id}`,
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

//RetrieveRequest
export const retrievePatientRequest = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/retrieve-match-status-professional/${id}`,

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

//Cancel Request
export const cancelRequest = async (id, reasons) => {
  try {
    const response = await axios.delete(
      `${Server_Connection()}/api/cancel-match-request/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        data: { reasons },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
    } else {
      showToast("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response?.data?.message || error.message);
    showToast(
      "error",
      error.response?.data?.message || "Something went wrong."
    );
    return null;
  }
};

export const acceptRequest = async (id) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/accept-match-request/${id}`,

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

export const getNotification = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-notification-professional/${id}`,

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

//getProfessionalPreferences

export const getProfessionalPreferences = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-professional-preferences/${id}`,

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
      console.log("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    console.error("Error:", error.response.data.message);
    return null;
  }
};

export const setUpdateProfessionalPreferences = async (professional_data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/updated-professional-preferences`,
      professional_data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      window.location.reload();
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

export const setAppointment = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/set-appointment`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      window.location.reload();
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

export const retrieveScheduleActive = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-appointments-active-professional/${id}"`,

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

    return null;
  }
};

export const retrieveScheduleHistory = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-appointments-history-professional/${id}"`,

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

    return null;
  }
};

export const handleSetRating = async (rating, id) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/set-rating-professionals/${id}`,
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
export const getUserActivity = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-user-activity`,
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
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};

export const getProfessionalActivity = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-professional-activity`,
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
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};
//get-appointments-professional
export const fetchProfessionalSchedule = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-appointments-professional/${id}`,
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
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    console.log("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};

//

export const fetchFeedbackProfessionals = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-feedback-professionals`,

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

export const changeScheduleAppointment = async (data) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/change-schedule-professional`,
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
      showToast("error", response.data.error);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);
    showToast("error", error.response.data.message);
    return null;
  }
};

export const declineChangeSchedule = async (id) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/decline-schedule-professional/${id}`,

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

export const handleStartSession = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/start-session`,
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

export const fetchSession = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-session/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.success;
    } else {
      return response.data.success;
    }
  } catch (error) {
    console.error("Error:", error.response.data.message);

    return null;
  }
};
///end-session

export const handleEndSession = async (id) => {
  try {
    const response = await axios.put(
      `${Server_Connection()}/api/end-session/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      showToast("success", response.data.message);
      window.location.reload();
    } else {
      showToast("error", response.data.message);
    }
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error.response.data.message);

    return null;
  }
};

export const getSessionReport = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-session-report`,
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
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};

//get-professional-history

export const getProfessionalHistory = async (id) => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-professional-history/${id}`,
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
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};

export const handleUploadPrescription = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/upload-prescription`,
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

export const handleDiagnosis = async (data) => {
  try {
    const response = await axios.post(
      `${Server_Connection()}/api/save-diagnosis`,
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

export const getReportCount = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-professional-report`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("This is report: " + response.data.data);
      return response.data.data;
    } else {
      showToast("error", response.data.message);
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};



export const getReportAdmin = async () => {
  try {
    const response = await axios.get(
      `${Server_Connection()}/api/get-professional-report-admin`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log("This is report: " + response.data.data);
      return response.data.data;
    } else {
      showToast("error", response.data.message);
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data?.message || "An error occurred"
    );
    showToast("error", error.response?.data?.message || "An error occurred");
    return null;
  }
};
