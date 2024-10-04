// components/MessageList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MessageList.scss';

const MessageList = ({ sentMessages, receivedMessages }) => {
  return (
    <div>
      {receivedMessages.length === 0
        ? ''
        : receivedMessages.map((msg) => (
            <Link to={`/messages/received/${msg._id}`} key={msg._id}>
              <div className="message-item">
                <p>{msg.message}</p>
                <p>보낸 사람: {msg.sender.fullName}</p>
                <p>받은 시간: {new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            </Link>
          ))}

      {sentMessages.length === 0
        ? ''
        : sentMessages.map((msg) => (
            <Link to={`/messages/sent/${msg._id}`} key={msg._id}>
              <div className="message-item">
                <p>{msg.message}</p>
                <p>보낸 사람: {msg.sender.fullName}</p>
                <p>보낸 시간: {new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default MessageList;
