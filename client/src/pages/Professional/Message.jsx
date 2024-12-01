import React, { useEffect, useState, useRef } from "react";
import { getInformationData } from "../../authentication/authentication";
import { fetchMessage, sendMessage, fetchDiagnosis } from "../../api/patients";
import {
  retrieveScheduleActive,
  handleStartSession,
  fetchSession,
  handleEndSession,
  handleUploadPrescription,
  handleDiagnosis,
} from "../../api/professionals";
import { FaPaperclip } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";

const Message = () => {
  const user = getInformationData();
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [chatId, setChatId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [session, setSession] = useState(false);
  const regexImage =
    /http:\/\/localhost:3000\/[\w\-/]+(?:\.(jpg|jpeg|png|gif|bmp|svg|webp))/i;
  const regexGoogleMeet = /https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+/i;
  const [endSessionTrigger, setEndSessionTrigger] = useState(false);
  const [diagnosis, setDiagnosis] = useState([]);
  const [newDiagnosis, setNewDiagnosis] = useState("");

  const fetchSchedule = async () => {
    const result = await retrieveScheduleActive(user.id);
    setScheduleData(result ? result : []);
  };
  const getDiagnosis = async () => {
    const result = await fetchDiagnosis(chatId);
    setDiagnosis(result ? result : []);
  };

  const fetchConversation = async () => {
    if (chatId) {
      const result = await fetchMessage(chatId);
      console.log(result);
      setMessages(result || []); // Ensure result is an array
      fetchCurrentSession();
    }
  };

  useEffect(() => {
    fetchSchedule();
    if (chatId) {
      fetchConversation();
      getDiagnosis();
    }
    console.log(scheduleData);
  }, [chatId]);

  const fetchCurrentSession = async () => {
    if (await fetchSession(chatId)) {
      setSession(true);
    }
  };

  const handlePersonClick = (person, id, patientid, professionalid) => {
    setSelectedPerson(person);
    setChatId(id);
    setPatientId(patientid);
    setProfessionalId(professionalid);
    fetchConversation();
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle file change and set preview URL
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAttachmentClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleSendMessage = async () => {
    if (message || file) {
      const formData = new FormData();
      formData.append("patient_id", patientId);
      formData.append("professional_id", professionalId);
      formData.append("message", message);
      formData.append("sender", user.id);

      if (file) {
        formData.append("file", file);
      }

      try {
        await sendMessage(formData, chatId); // Sending the form data with or without file
        fetchConversation(); // Fetch the updated conversation
        setMessage(""); // Clear message input
        setFile(null); // Clear the file
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleSendPayment = async () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append("message", "/transaction.jpg");
    formData.append("sender", user.id);

    try {
      await sendMessage(formData, chatId);
      handleCostPayment();
      fetchConversation();
      setMessage("");
      setFile(null);
      setEndSessionTrigger(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    fetchConversation();
    setMessage("");
    setFile(null);
  };

  const handleCostPayment = async () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append(
      "message",
      "The total cost will be ₱" + (user.service_fee + 100)
    );
    formData.append("sender", user.id);

    try {
      await sendMessage(formData, chatId);
      fetchConversation();
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    fetchConversation();
    setMessage("");
    setFile(null);
  };

  const handleSession = async () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append("message", "Session Started!");
    formData.append("sender", user.id);

    try {
      await sendMessage(formData, chatId);
      startSessionApi();
      fetchConversation();
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    fetchConversation();
    setMessage("");
    setFile(null);
  };

  const handleEndSessionMessage = async () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append("message", "Session Ended!");
    formData.append("sender", user.id);

    try {
      await sendMessage(formData, chatId);

      fetchConversation();
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    fetchConversation();
    setMessage("");
    setFile(null);
  };

  const startSessionApi = async () => {
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append("schedule_id", chatId);

    try {
      await handleStartSession(formData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEndSessionApi = async () => {
    try {
      await handleEndSession(chatId);
      handleEndSessionMessage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveDiagnosis = async () => {
    if (!newDiagnosis.trim()) {
      alert("Please enter a diagnosis.");
      return;
    }
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("professional_id", professionalId);
    formData.append("schedule_id", chatId);
    formData.append("description", newDiagnosis);

    try {
      await handleDiagnosis(formData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    getDiagnosis();
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically open the file input
  };

  const handleFilesChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // console.log("Selected file:", file);
      await handleUploadPrescription(file);
    }
  };

  return (
    <div className="flex pt-24 container p-2 space-x-4">
      {/* Left side: List of people */}
      <div className="flex  flex-row ">
        <Link to="/professional/dashboard">
          <IoArrowBackCircle className="text-3xl" />
        </Link>
      </div>
      <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-md">
        <h2 className="font-bold text-xl mb-4">Inbox</h2>
        <ul>
          {scheduleData.map((person) => (
            <li
              key={person.id}
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() =>
                handlePersonClick(
                  person.patient_name,
                  person.schedule_id,
                  person.patient_id,
                  person.professional_id
                )
              }
            >
              {person.patient_name}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 p-4 bg-white rounded-lg shadow-md">
        {selectedPerson ? (
          <div>
            <h2 className="font-bold text-xl mb-4">
              Chat with {selectedPerson}
            </h2>
            <div></div>

            {/* Display messages */}
            <div className="h-80 overflow-y-scroll mb-4 space-y-3 border border-spacing-2">
              {messages && messages.length === 0 ? (
                <div className="text-center text-gray-500">
                  No messages available.
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === user.id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === user.id &&
                        msg.message_content === "Session Started!"
                          ? "bg-green-500 text-white"
                          : msg.sender === user.id &&
                            msg.message_content === "Session Ended!"
                          ? "bg-red-500 text-white"
                          : msg.sender === user.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      <div>
                        <p>
                          {msg.message_content.match(regexGoogleMeet) ? (
                            // Google Meet Link
                            <a
                              href={
                                msg.message_content.match(regexGoogleMeet)[0]
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white underline"
                            >
                              {msg.message_content.match(regexGoogleMeet)[0]}
                            </a>
                          ) : msg.message_content.match(regexImage) ? (
                            <img
                              src={msg.message_content}
                              alt="Message Content"
                              className="max-w-full h-auto"
                            />
                          ) : /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(
                              msg.message_content
                            ) ? (
                            <img
                              src={msg.message_content}
                              alt="Message Content"
                              className="max-w-full h-auto"
                            />
                          ) : msg.message_content === "Session Started!" ? (
                            <span>{msg.message_content}</span>
                          ) : (
                            <span>{msg.message_content}</span>
                          )}
                        </p>
                        <p className="text-sm">
                          {new Date(msg.message_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {file && (
              <div className="mb-4">
                <img src={file} alt="Preview" className="max-h-16 rounded-lg" />
              </div>
            )}
            <div className="flex flex-row items-center pb-2 gap-2">
              {!session ? (
                <>
                  <button
                    onClick={() => handleSession()}
                    className="bg-green-600 text-white p-2 rounded-sm"
                  >
                    Start Session
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEndSessionApi()}
                    className="bg-red-600 text-white p-2 rounded-sm disabled:bg-red-300 disabled:cursor-not-allowed"
                    disabled={!endSessionTrigger}
                  >
                    End Session
                  </button>
                </>
              )}

              <button
                onClick={() => handleSendPayment()}
                className="bg-blue-600 text-white p-2 rounded-sm"
              >
                Send QR Code
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFilesChange}
                className="hidden" // Hide the input field
              />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button
                onClick={handleAttachmentClick}
                className="text-gray-500 hover:text-blue-500"
              >
                <FaPaperclip size={20} />
              </button>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={message}
                onChange={handleMessageChange}
                rows="3"
                placeholder="Type your message here..."
              />
              <button
                onClick={() => handleSendMessage()}
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                <IoIosSend className="text-3xl" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Select a person to start chatting
          </p>
        )}
      </div>

      {/* Diagnosis Section */}
      <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-md">
        <h2 className="font-bold text-xl mb-4">Diagnosis</h2>
        {selectedPerson ? (
          <div className="">
            {/* Check if diagnosis is an array and map through it */}
            <div className="text-gray-700 overflow-y-auto max-h-40">
              {Array.isArray(diagnosis) && diagnosis.length > 0 ? (
                diagnosis.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>Diagnosis:</strong> {item.description}
                    </p>
                    <p className="text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No diagnosis</p>
              )}
            </div>
            <div>
              {/* Only allow a single diagnosis input */}
              <textarea
                placeholder="Enter diagnosis here..."
                className="w-full h-40 border border-gray-300 rounded-lg p-2"
                value={newDiagnosis}
                for
                the
                input
                onChange={(e) => setNewDiagnosis(e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
              onClick={handleSaveDiagnosis}
            >
              Save Diagnosis
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a patient to add a diagnosis.
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
