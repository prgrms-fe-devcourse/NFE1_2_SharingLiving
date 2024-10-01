// pages/ReplyMessage.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Context import
import { useParams, useNavigate } from 'react-router-dom';
import './ReplyMessage.scss'; // SCSS 파일 import

const ReplyMessage = () => {
  const { messageId } = useParams();
  const { handleSendReply, currentUser } = useAppContext(); // currentUser 가져오기
  const [replyContent, setReplyContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 메시지 전송 로직 구현
    handleSendReply(messageId, replyContent); // 답장 전송
    console.log('답장 메시지가 전송되었습니다.');

    // 메시지함으로 리디렉션
    navigate('/messages');
  };

  return (
    <div className="reply-message">
      <h1 className="reply-message__title">답장 작성</h1>
      <form onSubmit={handleSubmit} className="reply-message__form">
        <div className="reply-message__input-group">
          <label htmlFor="replyContent" className="reply-message__label">
            답장 내용:
          </label>
          <textarea
            id="replyContent"
            rows="6"
            placeholder="답장 내용을 입력하세요."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)} // 입력값 상태 업데이트
            required
            className="reply-message__textarea"
          ></textarea>
        </div>
        <button type="submit" className="reply-message__submit-button">
          답장 전송
        </button>
      </form>
      <p>보내는 사람: {currentUser.name}</p> {/* 현재 사용자 이름 표시 */}
    </div>
  );
};

export default ReplyMessage;

// // api 연동 작업중(JWT 토큰 필요)
// // pages/ReplyMessage.jsx
// import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext'; // Context import
// import { useParams, useNavigate } from 'react-router-dom';
// import { sendMessageToUser } from '../../api/message'; // 메시지 전송 API import
// import './ReplyMessage.scss';

// const ReplyMessage = () => {
//   const { messageId } = useParams(); // URL 파라미터에서 메시지 ID 가져오기
//   const { currentUser } = useAppContext();
//   const [replyContent, setReplyContent] = useState(''); // 답장 내용 상태
//   const navigate = useNavigate();

//   console.log('>>> 현재 사용자: ', currentUser);

//   // 메시지 전송 로직 구현
//   const handleSendReply = async (content) => {
//     if (!currentUser || !currentUser.token) {
//       console.error('사용자가 로그인하지 않았습니다.'); // 로그인하지 않은 경우 처리
//       return;
//     }

//     try {
//       const receiverId = messageId; // 메시지를 받은 사용자의 ID로 설정
//       console.log('전송할 메시지 내용:', content);
//       console.log('수신자 ID:', receiverId);
//       console.log('사용자 토큰:', currentUser.token); // 토큰 확인

//       const response = await sendMessageToUser(
//         content,
//         receiverId,
//         currentUser
//       ); // 올바른 token 사용
//       console.log('답장 메시지가 전송되었습니다:', response);

//       // 메시지 전송 후 메시지함으로 리디렉션
//       navigate('/messages');
//     } catch (error) {
//       console.error(
//         '메시지 전송 중 에러 발생:',
//         error.response ? error.response.data : error.message
//       ); // 에러 로그 출력
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // 기본 폼 제출 이벤트 방지
//     handleSendReply(replyContent); // 답장 전송
//     setReplyContent(''); // 입력 필드 초기화
//   };

//   return (
//     <div className="reply-message">
//       <h1 className="reply-message__title">답장 작성</h1>
//       <form onSubmit={handleSubmit} className="reply-message__form">
//         <div className="reply-message__input-group">
//           <label htmlFor="replyContent" className="reply-message__label">
//             답장 내용:
//           </label>
//           <textarea
//             id="replyContent"
//             rows="6"
//             placeholder="답장 내용을 입력하세요."
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)} // 입력값 상태 업데이트
//             required
//             className="reply-message__textarea"
//           ></textarea>
//         </div>
//         <button type="submit" className="reply-message__submit-button">
//           답장 전송
//         </button>
//       </form>
//       <p>보내는 사람: {currentUser.name}</p> {/* 현재 사용자 이름 표시 */}
//     </div>
//   );
// };

// export default ReplyMessage;
