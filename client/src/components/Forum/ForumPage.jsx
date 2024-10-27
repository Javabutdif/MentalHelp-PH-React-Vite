import React, { useState, useEffect } from "react";
import { getConversation } from "../../api/community";
import { Switch, Button, Input } from "@mui/material";

const ForumPage = ({ data, onClose }) => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Fetches the initial conversation data
  useEffect(() => {
    const fetchConversation = async () => {
      //const convoData = await getConversation(data.id); // Assuming 'data' has the forum ID
      //setConversation(convoData);
    };
    fetchConversation();
  }, [data]);

  // Handles sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        content: message,
        anonymous: isAnonymous,
        sender: isAnonymous ? "Anonymous" : "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      setConversation([...conversation, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="forum-page">
      <div className="forum-header"></div>

      <div className="forum-conversation">
        {conversation.map((msg, index) => (
          <div key={index} className="message">
            <span className="sender">{msg.sender}</span>
            <span className="content">{msg.content}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="forum-input">
        <Switch
          checked={isAnonymous}
          onChange={() => setIsAnonymous(!isAnonymous)}
          color="primary"
        />
        <span>
          {isAnonymous ? "Posting as Anonymous" : "Posting as Yourself"}
        </span>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage} variant="contained" color="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ForumPage;
