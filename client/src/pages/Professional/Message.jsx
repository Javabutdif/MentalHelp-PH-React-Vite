import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import { fetchMessage, sendMessage } from "../../api/patients";
import { retrieveScheduleActive } from "../../api/professionals";
import { FaPaperclip } from "react-icons/fa";

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

  const fetchSchedule = async () => {
    const result = await retrieveScheduleActive(user.id);
    setScheduleData(result);
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

  return (
    <div className="flex pt-24 container p-2 space-x-4">
      {/* Left side: List of people */}
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

      {/* Right side: Chat window */}
      <div className="w-3/4 p-4 bg-white rounded-lg shadow-md">
        {selectedPerson ? (
          <div>
            <h2 className="font-bold text-xl mb-4">
              Chat with Dr. {selectedPerson}
            </h2>
            {/* Display messages */}
            <div className="h-80 overflow-y-scroll mb-4 space-y-3">
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
                        msg.sender === user.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {msg.message_content}
                      {msg.message_content && (
                        <img
                          src={msg.message_content}
                          alt="uploaded"
                          className="mt-2 max-h-32 rounded-lg"
                        />
                      )}
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
            </div>

            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Send Message
            </button>
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
