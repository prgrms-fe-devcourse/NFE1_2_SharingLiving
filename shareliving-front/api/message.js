// api/message.js
import axios from 'axios';

// Axios 기본 설정
const createApiClient = (token) => {
  if (!token) {
    throw new Error('토큰이 필요합니다.'); // 토큰이 없을 경우 에러 처리
  }

  console.log('API 클라이언트 생성: ', token); // token 확인
  return axios.create({
    baseURL: 'https://kdt.frontend.5th.programmers.co.kr:5003',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// 1. 나의 메시지 목록 불러오기
export const fetchConversations = async (currentUser) => {
  console.log('현재 사용자:', currentUser); // 현재 사용자 확인
  const apiClient = createApiClient(currentUser.token);

  try {
    const response = await apiClient.get('/messages/conversations');
    return response.data; // Conversation[] 배열 반환
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// 2. 특정 사용자와 소통한 메시지 목록 불러오기
export const fetchMessagesWithUser = async (currentUser) => {
  console.log('현재 사용자:', currentUser); // 현재 사용자 확인
  const apiClient = createApiClient(currentUser.token);

  try {
    const response = await apiClient.get(`/messages`, {
      params: { userId },
    });
    return response.data; // Message[] 배열 반환
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// 3. 특정 사용자에게 메시지 전송
export const sendMessageToUser = async (message, receiverId, currentUser) => {
  console.log('메시지 전송: ', message, receiverId); // 전송할 메시지와 수신자 확인
  const apiClient = createApiClient(currentUser.token);

  try {
    const response = await apiClient.post('/messages/create', {
      message, // 메시지 내용
      receiver: receiverId, // receiver는 사용자 ID
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error sending message:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 4. 메시지 확인 처리 (읽음 처리)
export const markMessagesAsSeen = async (message, senderId, currentUser) => {
  console.log('메시지 확인: ', message, senderId); // 받은 메시지와 발신자 확인
  const apiClient = createApiClient(currentUser.token);

  try {
    const response = await apiClient.put('/messages/update-seen', {
      sender: senderId,
    });
    return response.data;
  } catch (error) {
    console.error('Error marking messages as seen:', error);
    throw error;
  }
};
