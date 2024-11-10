import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import { retrieveScheduleActive } from "../../api/patients";

const Message = () => {
  const user = getInformationData();
  const [scheduleData, setScheduleData] = useState([]);

  const fetchSchedule = async () => {
    const result = await retrieveScheduleActive(user.id);
    setScheduleData(result);
  };
  useEffect(() => {
    fetchSchedule();
    console.log(scheduleData);
  }, []);

  const [selectedPerson, setSelectedPerson] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle person click event
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    console.log(person);
  };

  // Handle message change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle message send
  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage(""); // Clear message input after sending
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
              onClick={() => handlePersonClick(person.professional_name)}
            >
              {person.professional_name}
            </li>
          ))}
        </ul>
      </div>

   
      <div className="w-3/4 p-4 bg-white rounded-lg shadow-md">
        {selectedPerson ? (
          <div>
            <h2 className="font-bold text-xl mb-4">
              Chat with Dr. {selectedPerson}
            </h2>
            {/* Display messages */}
            <div className="h-80 overflow-y-scroll mb-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input area */}
            <div className="mb-4">
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
