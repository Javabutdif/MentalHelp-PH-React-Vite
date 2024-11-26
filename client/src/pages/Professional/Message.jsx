import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import { fetchMessage, sendMessage } from "../../api/patients";
import { retrieveScheduleActive } from "../../api/professionals";
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
  const regex = /(https:\/\/meet\.google\.com\/[a-zA-Z0-9\-]+)/;

  const fetchSchedule = async () => {
    const result = await retrieveScheduleActive(user.id);
    setScheduleData(result ? result : []);
  };

  const fetchConversation = async () => {
    if (chatId) {
      const result = await fetchMessage(chatId);
      console.log(result);
      setMessages(result || []); // Ensure result is an array
    }
  };

  useEffect(() => {
    fetchSchedule();
    if (chatId) {
      fetchConversation();
    }
    console.log(scheduleData);
  }, [chatId]);

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
      setFile(URL.createObjectURL(selectedFile));
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
      "The total cost will be ₱" + (user.service_fee + 60)
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
                          ? "bg-green-500 text-white" : 
                          msg.sender === user.id ? "bg-blue-500 text-white"
                          
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      <div>
                        <p>
                          {msg.message_content.match(regex) ? (
                            // Link detection
                            <a
                              href={msg.message_content.match(regex)[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white-500 underline"
                            >
                              {msg.message_content.match(regex)[0]}
                            </a>
                          ) : /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(
                              msg.message_content
                            ) ? (
                            <img
                              src={msg.message_content}
                              alt="Message Content"
                              className="max-w-full h-auto"
                            />
                          ) : msg.message_content === "Session Started!" ? (
                            // Plain text fallback
                            <>
                              {" "}
                              <span>{msg.message_content}</span>
                            </>
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
              <button
                onClick={() => handleSession()}
                className="bg-green-600 text-white p-2 rounded-sm"
              >
                Start Session
              </button>
              <button
                onClick={() => handleSendPayment()}
                className="bg-blue-600 text-white p-2 rounded-sm"
              >
                Send Payment
              </button>
              <button className="bg-red-600 text-white p-2 rounded-sm">
                Delete Chat
              </button>
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
                onClick={handleSendMessage}
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
    </div>
  );
};

export default Message;
