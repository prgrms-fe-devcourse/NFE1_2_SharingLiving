import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { sendMessageToUser } from '../utils/api';
import './ReplyMessage.scss';

const ReplyMessage = () => {
  const { currentUser } = useAppContext(); // 현재 사용자 상태
  const { messageId } = useParams(); // 메시지 ID 가져오기
  const [replyContent, setReplyContent] = useState(''); // 답장 내용 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [originalMessage, setOriginalMessage] = useState(null); // 받은 메시지 상태
  const [sentMessage, setSentMessage] = useState(null); // 보낸 메시지 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 받은 메시지 찾기
    const receivedMessagesString = localStorage.getItem('receivedMessages');
    const receivedMessages = receivedMessagesString
      ? JSON.parse(receivedMessagesString)
      : [];
    const message = receivedMessages.find((msg) => msg._id === messageId);
    setOriginalMessage(message);

    // 보낸 메시지 찾기
    const sentMessagesString = localStorage.getItem('sentMessages');
    const sentMessages = sentMessagesString
      ? JSON.parse(sentMessagesString)
      : [];
    setSentMessage(sentMessages);
  }, [messageId]);
  console.log('받은 메시지: ', originalMessage);
  console.log('보낸 메시지: ', sentMessage);

  // 메시지 전송 로직
  const handleSendReply = async (content) => {
    if (!currentUser || !currentUser.token) {
      setError('사용자가 로그인하지 않았습니다.');
      return;
    }

    if (content.trim() === '') {
      setError('답장 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 메시지 전송 API 호출
      const response = await sendMessageToUser(
        content,
        currentUser.email, // 원본 메시지의 발신자 ID로 설정
        currentUser.token
      );

      console.log('답장 메시지가 전송되었습니다:', response);

      // 새로 보낸 메시지를 sentMessages에 추가
      const newSentMessage = {
        _id: response._id, // API 응답에서 ID 가져오기
        message: content, // 사용자가 입력한 메시지 내용
        sender: {
          _id: currentUser._id, // 현재 사용자 ID 추가
          fullName: currentUser.fullName, // 현재 사용자 이름
          email: currentUser.email, // 현재 사용자 이메일
        },
        receiver: {
          _id: originalMessage.sender._id, // 수신자의 ID 추가
          email: originalMessage.sender.email,
          fullName: originalMessage.sender.fullName, // 현재 사용자 이름
        }, // 수신자 정보
      };

      // 기존 보낸 메시지에 새 메시지 추가
      const updatedSentMessages = [...sentMessage, newSentMessage];
      localStorage.setItem(
        'newSentMessages',
        JSON.stringify(updatedSentMessages)
      );
      setSentMessage(updatedSentMessages); // 상태 업데이트

      navigate(`/messages/conversations`); // 메시지 목록 페이지로 이동
    } catch (error) {
      console.error(
        '메시지 전송 중 에러 발생:',
        error.response ? error.response.data : error.message
      );
      setError('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendReply(replyContent);
    setReplyContent(''); // 입력 필드 초기화
  };

  return (
    <div className="reply-message">
      <h1 className="reply-message__title">답장 작성</h1>
      {originalMessage ? (
        <>
          <p>받는 사람: {originalMessage.sender.email}</p>
          {/* <p>보내는 사람: {currentUser.email}</p> */}
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
                className="reply-message__textarea"
              ></textarea>
            </div>
            <button
              type="submit"
              className="reply-message__submit-button"
              disabled={loading}
            >
              {loading ? '전송 중...' : '답장 전송'}
            </button>
          </form>
        </>
      ) : (
        <p>메시지 정보를 불러오고 있습니다...</p>
      )}
      {error && <p className="reply-message__error">{error}</p>}
    </div>
  );
};

export default ReplyMessage;
