// pages/MessagesPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchMessagesWithUser } from '../utils/api';
import { useAppContext } from '../context/AppContext';
import MessageList from '../components/MessageList';

const MessagesPage = () => {
  const { currentUser } = useAppContext(); // 현재 사용자 정보
  const [conversations, setConversations] = useState({
    sent: [],
    received: [],
  }); // 보낸/받은 메시지 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 로컬 저장소에서 메시지 불러오기
  const loadMessagesFromLocalStorage = () => {
    try {
      const storedNewSentMessages = localStorage.getItem('sentMessages');
      const newSentMessagesString = localStorage.getItem('newSentMessages');
      const storedReceivedMessages = localStorage.getItem('receivedMessages');
      const storeUserInfo = localStorage.getItem('userInfo');

      // 임시 데이터
      const temporaryReceivedMessages = [
        {
          seen: false,
          _id: '0',
          message: '안녕하세요!',
          sender: {
            role: 'Regular',
            fullName: '김유진',
            email: 'yujin@example.com',
          },
          createdAt: '2024-10-02T02:45:46.900Z',
          recipient: storeUserInfo.email, // 수신자 이름 추가
        },
        {
          seen: false,
          _id: '1',
          message: '이 메시지를 확인해주세요.',
          sender: {
            role: 'Regular',
            fullName: '이준호',
            email: 'junho@example.com',
          },
          createdAt: '2024-10-02T02:56:27.255Z',
          recipient: storeUserInfo.email, // 수신자 이름 추가
        },
        {
          seen: false,
          _id: '2',
          message: '제가 나눔 받고 싶어요.',
          sender: {
            role: 'Regular',
            fullName: '박박박',
            email: 'park@example.com',
          },
          createdAt: '2024-10-02T02:56:27.255Z',
          recipient: storeUserInfo.email, // 수신자 이름 추가
        },
      ];

      return {
        sent: storedNewSentMessages ? JSON.parse(storedNewSentMessages) : [],
        newSent: newSentMessagesString ? JSON.parse(newSentMessagesString) : [],
        received: storedReceivedMessages
          ? JSON.parse(storedReceivedMessages) // 기존 받은 메시지 가져오기
          : temporaryReceivedMessages, // 로컬에 받은 메시지가 없을 경우 임시 데이터 반환
      };
    } catch (error) {
      console.error('로컬 스토리지에서 메시지 불러오기 중 에러 발생:', error);
      return { sent: [], received: [], newSent: [] }; // 기본값 반환
    }
  };

  // 메시지를 로컬 저장소에 저장
  const saveMessagesToLocalStorage = (sent, received) => {
    localStorage.setItem('sentMessages', JSON.stringify(sent));
    localStorage.setItem('receivedMessages', JSON.stringify(received));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser?.token) {
        setError('로그인이 필요합니다.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const localMessages = loadMessagesFromLocalStorage(); // 로컬 저장소에서 메시지 불러오기
        const apiMessages = await fetchMessagesWithUser(currentUser.token); // API 호출

        // 새로운 보낸 메시지가 로컬 저장소에 이미 존재하는지 확인
        const existingSentMessages = localMessages.newSent;

        // 중복된 메시지를 제거하기 위해 Set을 사용
        const uniqueSentMessages = [
          ...new Map(
            [...apiMessages, ...existingSentMessages].map((msg) => [
              msg._id,
              msg,
            ])
          ).values(),
        ];

        // 통합된 메시지 상태 업데이트
        setConversations({
          sent: uniqueSentMessages,
          received: [...localMessages.received],
        });

        // 메시지 로컬 저장소에 저장
        saveMessagesToLocalStorage(uniqueSentMessages, [
          ...localMessages.received,
        ]);
      } catch (error) {
        console.error('메시지 불러오기 중 에러 발생:', error);
        setError('메시지 불러오기 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    // 컴포넌트 마운트 시 메시지 가져오기 호출
    fetchMessages();
  }, [currentUser?.token]);

  return (
    <div>
      <h1>메시지함</h1>
      {loading && <p>메시지 불러오는 중...</p>}
      {error && <p className="error-message">{error}</p>}

      <MessageList
        sentMessages={conversations.sent}
        receivedMessages={conversations.received}
      />
    </div>
  );
};

export default MessagesPage;
