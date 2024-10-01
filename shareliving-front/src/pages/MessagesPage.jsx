// pages/MessagesPage.jsx
import React from 'react';
import MessageList from '../components/MessageList';

const MessagesPage = ({ receivedMessages, sentMessages }) => {
  return (
    <div>
      <h1>메시지함</h1>
      <MessageList
        receivedMessages={receivedMessages}
        sentMessages={sentMessages}
      />
      {/* 메시지 상세 내용 컴포넌트는 라우팅에 의해 표시됩니다. */}
    </div>
  );
};

export default MessagesPage;
