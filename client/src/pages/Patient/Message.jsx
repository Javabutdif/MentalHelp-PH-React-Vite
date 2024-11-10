import React, { useState } from "react";

const Message = () => {
  // Sample list of people
  const people = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "John Doe", text: "Hey, how are you?" },
    { sender: "You", text: "I'm good, thanks! How about you?" },
  ]);

  // Handle person click event
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
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
          {people.map((person) => (
            <li
              key={person.id}
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => handlePersonClick(person)}
            >
              {person.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Chat window */}
      <div className="w-3/4 p-4 bg-white rounded-lg shadow-md">
        {selectedPerson ? (
          <div>
            <h2 className="font-bold text-xl mb-4">
              Chat with {selectedPerson.name}
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
