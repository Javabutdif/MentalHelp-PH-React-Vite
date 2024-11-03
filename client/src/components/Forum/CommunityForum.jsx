import React, { useEffect, useState } from "react";
import { getInformationData } from "../../authentication/authentication";
import { sendDiscussion, getConversation } from "../../api/community";
import { useParams } from "react-router-dom";

const ChatMessage = ({ avatar, username, message, isUser, date }) => (
  <div className={`flex items-center mb-3 ${isUser ? "justify-end" : ""}`}>
    {!isUser && (
      <img
        src={avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
    )}
    <div
      className={`p-3 rounded-lg ${
        isUser ? "bg-blue-200 text-right" : "bg-white"
      } shadow-lg max-w-xs`}
    >
      <p className="text-sm font-semibold">{username}</p>
      <p>{message}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    {isUser && (
      <img
        src={avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full ml-3 object-cover"
      />
    )}
  </div>
);

const CommunityForum = () => {
  const user = getInformationData();
  const { forum_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const formData = new FormData();
      formData.append("forum_id", forum_id);
      formData.append("id", user.id);
      formData.append("message", newMessage);
      formData.append("isAnonymous", isAnonymous);
      //console.log(formData);
      try {
        await sendDiscussion(formData);
        fetchConversation();
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const fetchConversation = async () => {
    try {
      const result = await getConversation(forum_id);

      // Ensure result.data is a valid array before proceeding
      const conversations = Array.isArray(result)
        ? result.map((item) => ({
            avatar:
              item.isAnonymous === 1
                ? "https://via.placeholder.com/40"
                : item.photo || "https://via.placeholder.com/40",
            username: item.isAnonymous
              ? "Anonymous"
              : `${item.firstname || ""} ${item.lastname || ""}`.trim(), // fallback in case names are missing
            message: item.message || "", // fallback for message
            isUser: item.patient_id === user.id,
            date: new Date(item.msg_datetime).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }))
        : [];

      // console.log("Fetched Conversations:", result);
      setMessages(conversations);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [forum_id]);

  return (
    <div className="w-full bg-cyan-50 border rounded-lg shadow-md p-4 flex flex-col h-full pt-28">
      <div
        className="p-4 space-y-3 bg-blue-100 rounded-lg overflow-auto flex-grow"
        style={{ maxHeight: "430px" }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No conversation. Wanna start?
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              avatar={msg.avatar}
              username={msg.username}
              message={msg.message}
              isUser={msg.isUser}
              date={msg.date}
            />
          ))
        )}
      </div>

      <footer className="mt-4">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
          <label className="flex items-center mr-4">
            <span className="mr-2">Anonymous</span>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="toggle-checkbox"
            />
            <span className="toggle-label"></span>
          </label>
          <img
            src={isAnonymous ? "https://via.placeholder.com/40" : user.photo}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="..."
            className="flex-grow mx-2 p-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white px-3 py-1 rounded-lg"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CommunityForum;
