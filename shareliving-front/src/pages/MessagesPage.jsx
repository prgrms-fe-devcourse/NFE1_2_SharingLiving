// pages/MessagesPage.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext'; // Context import
import MessageList from '../components/MessageList';

const MessagesPage = () => {
  const { receivedMessages, sentMessages } = useAppContext();

  return (
    <div>
      <h1>메시지함</h1>
      <MessageList
        receivedMessages={receivedMessages}
        sentMessages={sentMessages}
      />
    </div>
  );
};

export default MessagesPage;
