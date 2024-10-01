// components/MessageList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MessageList.scss'; // SCSS 파일 import

const MessageList = ({ receivedMessages, sentMessages }) => {
  const [activeTab, setActiveTab] = useState('received'); // 기본 탭 설정

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="message-list">
      <div className="message-list__tabs">
        <button
          className={`message-list__tab ${
            activeTab === 'received' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('received')}
        >
          받은 메시지
        </button>
        <button
          className={`message-list__tab ${
            activeTab === 'sent' ? 'active' : ''
          }`}
          onClick={() => handleTabClick('sent')}
        >
          보낸 메시지
        </button>
      </div>

      {activeTab === 'received' && (
        <div className="message-list__content">
          <h2>받은 메시지 목록</h2>
          <ul>
            {receivedMessages.map((message) => (
              <li key={message.id}>
                <Link to={`/messages/${message.id}`}>
                  {message.subject} (보낸 사람: {message.sender})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'sent' && (
        <div className="message-list__content">
          <h2>보낸 메시지 목록</h2>
          <ul>
            {sentMessages.map((message) => (
              <li key={message.id}>
                <Link to={`/messages/${message.id}`}>
                  {message.subject} (받는 사람: 현재 사용자)
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessageList;
