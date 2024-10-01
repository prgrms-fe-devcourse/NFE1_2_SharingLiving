// components/MessageList.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './MessageList.scss'; // SCSS 파일 import

const MessageList = ({ receivedMessages, sentMessages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState('received'); // 기본 탭 설정
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const tab = searchParams.get('tab') || 'received'; // URL 파라미터에서 탭 상태 가져오기
    setCurrentTab(tab);
    setIsLoading(false); // 탭 상태 설정 후 로딩 해제
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSearchParams({ tab });
  };

  // 로딩 중일 때 아무것도 렌더링하지 않음
  if (isLoading) {
    return null;
  }

  return (
    <div className="message-list">
      <div className="message-list__tabs">
        <button
          className="message-list__tab"
          onClick={() => handleTabChange('received')}
          style={{
            backgroundColor: currentTab === 'received' ? '#4CAF50' : '#f0f0f0',
            padding: '10px',
            margin: '5px',
          }}
        >
          받은 메시지
        </button>
        <button
          className="message-list__tab"
          onClick={() => handleTabChange('sent')}
          style={{
            backgroundColor: currentTab === 'sent' ? '#4CAF50' : '#f0f0f0',
            padding: '10px',
            margin: '5px',
          }}
        >
          보낸 메시지
        </button>
      </div>

      {currentTab === 'received' && (
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

      {currentTab === 'sent' && (
        <div className="message-list__content">
          <h2>보낸 메시지 목록</h2>
          <ul>
            {sentMessages.map((message) => (
              <li key={message.id}>
                <Link to={`/messages/${message.id}`}>
                  {message.subject} (받는 사람: {message.recipient})
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

// // api 연동 작업중(JWT 토큰 필요)
// // components/MessageList.jsx
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import './MessageList.scss'; // SCSS 파일 import

// const MessageList = ({ conversations }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [currentTab, setCurrentTab] = useState('received'); // 기본 탭 설정
//   const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

//   useEffect(() => {
//     const tab = searchParams.get('tab') || 'received'; // URL 파라미터에서 탭 상태 가져오기
//     setCurrentTab(tab);
//     setIsLoading(false); // 탭 상태 설정 후 로딩 해제
//   }, [searchParams]);

//   const handleTabChange = (tab) => {
//     setCurrentTab(tab);
//     setSearchParams({ tab });
//   };

//   // 로딩 중일 때 아무것도 렌더링하지 않음
//   if (isLoading) {
//     return null;
//   }

//   // 받은 메시지 목록 필터링
//   const receivedMessages = conversations.filter((conversation) =>
//     conversation.messages.some((message) => message.direction === 'received')
//   );

//   // 보낸 메시지 목록 필터링
//   const sentMessages = conversations.filter((conversation) =>
//     conversation.messages.some((message) => message.direction === 'sent')
//   );

//   return (
//     <div className="message-list">
//       <div className="message-list__tabs">
//         <button
//           className="message-list__tab"
//           onClick={() => handleTabChange('received')}
//           style={{
//             backgroundColor: currentTab === 'received' ? '#4CAF50' : '#f0f0f0',
//             padding: '10px',
//             margin: '5px',
//           }}
//         >
//           받은 메시지
//         </button>
//         <button
//           className="message-list__tab"
//           onClick={() => handleTabChange('sent')}
//           style={{
//             backgroundColor: currentTab === 'sent' ? '#4CAF50' : '#f0f0f0',
//             padding: '10px',
//             margin: '5px',
//           }}
//         >
//           보낸 메시지
//         </button>
//       </div>

//       {currentTab === 'received' && (
//         <div className="message-list__content">
//           <h2>받은 메시지 목록</h2>
//           <ul>
//             {receivedMessages.length > 0 ? (
//               receivedMessages.map((conversation) =>
//                 conversation.messages
//                   .filter((message) => message.direction === 'received')
//                   .map((message) => (
//                     <li key={message.id}>
//                       <Link to={`/messages/${message.id}`}>
//                         {message.subject} (보낸 사람:{' '}
//                         {conversation.otherUser.name})
//                       </Link>
//                     </li>
//                   ))
//               )
//             ) : (
//               <li>받은 메시지가 없습니다.</li>
//             )}
//           </ul>
//         </div>
//       )}

//       {currentTab === 'sent' && (
//         <div className="message-list__content">
//           <h2>보낸 메시지 목록</h2>
//           <ul>
//             {sentMessages.length > 0 ? (
//               sentMessages.map((conversation) =>
//                 conversation.messages
//                   .filter((message) => message.direction === 'sent')
//                   .map((message) => (
//                     <li key={message.id}>
//                       <Link to={`/messages/${message.id}`}>
//                         {message.subject} (받는 사람:{' '}
//                         {conversation.otherUser.name})
//                       </Link>
//                     </li>
//                   ))
//               )
//             ) : (
//               <li>보낸 메시지가 없습니다.</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
