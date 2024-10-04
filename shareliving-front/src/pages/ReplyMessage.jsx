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
