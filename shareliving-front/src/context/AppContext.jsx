import React, { createContext, useContext, useState } from 'react';

// Context 생성
const AppContext = createContext();

// Provider 컴포넌트
export const AppProvider = ({ children }) => {
  // 기존 상태 관리
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  // 메시지 상태 관리
  const [receivedMessages, setReceivedMessages] = useState([
    {
      id: 1,
      subject: '첫 번째 메시지',
      body: '안녕하세요! 첫 번째 메시지입니다.',
      sender: '사용자A',
    },
    {
      id: 2,
      subject: '두 번째 메시지',
      body: '안녕하세요! 두 번째 메시지입니다.',
      sender: '사용자B',
    },
  ]);

  const [sentMessages, setSentMessages] = useState([]);

  // 임시 현재 사용자 정보
  const [currentUser, setCurrentUser] = useState({
    name: '현재 사용자',
    email: 'currentuser@example.com',
  });

  // 답장 메시지 추가 함수
  const handleSendReply = (originalMessageId, replyContent) => {
    const originalMessage = receivedMessages.find(
      (msg) => msg.id === Number(originalMessageId)
    );

    if (originalMessage) {
      const newMessage = {
        id: sentMessages.length + 1 + receivedMessages.length,
        subject: `Re: ${originalMessage.subject}`,
        body: replyContent,
        sender: currentUser.name,
        recipient: originalMessage.sender, // 받는 사람 이름 추가
      };

      setSentMessages([...sentMessages, newMessage]);
      console.log('답장 메시지가 상태에 추가되었습니다.');
    } else {
      console.log('원본 메시지를 찾을 수 없습니다.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        // 기존 전역 상태
        showBreadcrumbs,
        setShowBreadcrumbs,
        hideSidebar,
        setHideSidebar,
        // 메시지 관련 상태
        receivedMessages,
        sentMessages,
        handleSendReply,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useAppContext = () => useContext(AppContext);
