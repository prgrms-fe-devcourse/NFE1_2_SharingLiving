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

// // api 연동 작업중(JWT 토큰 필요)
// // pages/MessagesPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext'; // Context import
// import MessageList from '../components/MessageList';
// import { fetchConversations } from '../../api/message'; // API 함수 import

// const MessagesPage = () => {
//   const { currentUser } = useAppContext();
//   const [conversations, setConversations] = useState([]); // 메시지 목록 상태

//   useEffect(() => {
//     const loadConversations = async () => {
//       try {
//         const data = await fetchConversations(currentUser); // API 호출
//         setConversations(data); // 상태 업데이트
//       } catch (error) {
//         console.error('Error loading conversations:', error);
//       }
//     };

//     // currentUser가 존재할 때만 호출
//     if (currentUser && currentUser.token) {
//       loadConversations(); // API 호출
//     }
//   }, [currentUser]); // currentUser가 변경될 때만 호출

//   return (
//     <div>
//       <h1>메시지함</h1>
//       <MessageList conversations={conversations} /> {/* MessageList에 전달 */}
//     </div>
//   );
// };

// export default MessagesPage;
