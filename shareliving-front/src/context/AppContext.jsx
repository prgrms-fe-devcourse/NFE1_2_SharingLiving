import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const AppContext = createContext();

// Provider 컴포넌트
export const AppProvider = ({ children }) => {
  // 기존 상태 관리
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  // 메시지 상태 관리
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  // 초기 현재 사용자 정보 상태 (토큰을 null로 초기화)
  const [currentUser, setCurrentUser] = useState({
    name: '현재 사용자',
    email: 'currentuser@example.com',
    token: null, // 초기값을 null로 설정
  });

  // 토큰 로딩 상태 추가
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        ...JSON.parse(userInfo),
      }));
    }

    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        token,
      }));
    }

    // 토큰 로딩 완료
    setIsTokenLoading(false);
  }, []); // 빈 배열로 설정하여 한 번만 실행

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

  // 탭 메뉴 활성화 상태
  const [activeTab, setActiveTab] = useState('received');

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
        setCurrentUser,
        isTokenLoading, // 추가: 로딩 상태 전달
        // 탭 활성화 관련 상태
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useAppContext = () => useContext(AppContext);
