// utils/api.js
import axios from 'axios';

const API_BASE_URL = '/api';

// Axios 인스턴스 생성
const api = (token) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

// 1. 나의 메시지함 불러오기
export const fetchConversations = async (token) => {
  try {
    const response = await api(token).get('/messages/conversations');
    return response.data; // Conversation[] 반환
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// 2. 특정 사용자와의 메시지 목록 불러오기
export const fetchMessagesWithUser = async (token) => {
  try {
    const response = await api(token).get('/messages');
    return response.data; // Message[] 반환
  } catch (error) {
    console.error(
      'Error fetching messages with user:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// export const fetchMessageById = async (messageId, token) => {
//   const response = await api(token).get(`/messages/${messageId}`); // Adjust the API endpoint as needed
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// 특정 메시지 세부 정보 불러오기
export const fetchMessageDetail = async (messageId, token) => {
  try {
    const response = await api(token).get(`/messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching messages with user:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 3. 특정 사용자에게 메시지 전송
export const sendMessageToUser = async (message, receiverId, token) => {
  try {
    const response = await api(token).post('/messages/create', {
      message,
      receiverId,
    });
    return response.data; // Message
  } catch (error) {
    console.error(`Error sending message to user ${receiverId}:`, error);
    throw error;
  }
};
