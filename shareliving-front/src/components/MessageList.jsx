// components/MessageList.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './MessageList.scss';

const MessageList = ({ receivedMessages, sentMessages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState('received');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'received';
    setCurrentTab(tab);
    setIsLoading(false);
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSearchParams({ tab });
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="message-list">
      <div className="message-list__tabs">
        <button
          className={`message-list__tab ${
            currentTab === 'received' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('received')}
        >
          받은 메시지
        </button>
        <button
          className={`message-list__tab ${
            currentTab === 'sent' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('sent')}
        >
          보낸 메시지
        </button>
      </div>

      {currentTab === 'received' && (
        <div className="message-list__content">
          <h2>받은 메시지 목록</h2>
          <ul>
            {receivedMessages.length > 0 ? (
              receivedMessages.map((message) => (
                <li key={message._id}>
                  <Link to={`/messages/received/${message._id}`}>
                    {message.message} (보낸 사람: {message.sender.email})
                  </Link>
                </li>
              ))
            ) : (
              <p>받은 메시지가 없습니다.</p>
            )}
          </ul>
        </div>
      )}

      {currentTab === 'sent' && (
        <div className="message-list__content">
          <h2>보낸 메시지 목록</h2>
          <ul>
            {sentMessages.length > 0 ? (
              sentMessages.map((message) => (
                <li key={message._id}>
                  <Link to={`/messages/sent/${message._id}`}>
                    {message.message} (받는 사람: {message.receiver.email})
                  </Link>
                </li>
              ))
            ) : (
              <p>보낸 메시지가 없습니다.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessageList;
