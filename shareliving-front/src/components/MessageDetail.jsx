import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './MessageDetail.scss';

const MessageDetail = () => {
  const { messageId } = useParams();
  const { activeTab } = useAppContext(); // activeTab 사용
  const sentMessagesString = localStorage.getItem('newSentMessages');
  const receivedMessagesString = localStorage.getItem('receivedMessages');
  const sentMessages = sentMessagesString ? JSON.parse(sentMessagesString) : [];
  const receivedMessages = receivedMessagesString
    ? JSON.parse(receivedMessagesString)
    : [];

  const navigate = useNavigate();

  // 메시지 확인 로직 수정
  const sentMessage = sentMessages.find((msg) => msg._id === messageId);
  const receivedMessage = receivedMessages.find((msg) => msg._id === messageId);

  const currentMessage = sentMessage || receivedMessage;
  const isSentMessage = Boolean(sentMessage);
  const isReceivedMessage = Boolean(receivedMessage);

  // 이전 및 다음 메시지 구하기
  const previousMessage = isSentMessage
    ? sentMessages[
        sentMessages.findIndex((msg) => msg._id === messageId) - 1
      ] || null
    : isReceivedMessage
    ? receivedMessages[
        receivedMessages.findIndex((msg) => msg._id === messageId) - 1
      ] || null
    : null;

  const nextMessage = isSentMessage
    ? sentMessages[
        sentMessages.findIndex((msg) => msg._id === messageId) + 1
      ] || null
    : isReceivedMessage
    ? receivedMessages[
        receivedMessages.findIndex((msg) => msg._id === messageId) + 1
      ] || null
    : null;

  // 나눔 확정 핸들러
  const handleConfirmPick = () => {
    const userConfirmed = window.confirm('정말로 나눔을 확정하시겠습니까?');

    if (userConfirmed) {
      // 나눔 확정 로직
      // 예시로 메시지 목록 페이지로 이동
      alert('나눔이 확정되었습니다.');
      navigate(`/messages`);
    }
  };

  return (
    <div className="message-detail">
      <h2>메시지 상세 내용</h2>
      {currentMessage ? (
        <div className="message-detail__content">
          <h3>{sentMessage ? '보낸 메시지' : '받은 메시지'}</h3>
          <p>{currentMessage.message}</p>
          <p>
            {sentMessage
              ? `받는 사람: ${currentMessage.receiver.fullName}`
              : `보낸 사람: ${currentMessage.sender.fullName}`}
          </p>
          <p>
            전송 날짜: {new Date(currentMessage.createdAt).toLocaleString()}
          </p>
          <div className="message-detail__navigation">
            {previousMessage && (
              <Link
                to={`/messages/${activeTab === 'sent' ? 'sent' : 'received'}/${
                  previousMessage._id
                }`}
                className="message-detail__link"
              >
                이전 메시지
              </Link>
            )}
            {nextMessage && (
              <Link
                to={`/messages/${activeTab === 'sent' ? 'sent' : 'received'}/${
                  nextMessage._id
                }`}
                className="message-detail__link"
              >
                다음 메시지
              </Link>
            )}
          </div>
          <div className="message-detail__actions">
            <Link
              to={`/messages`}
              className="message-detail__reply-button message-detail__list-button"
            >
              메시지 목록
            </Link>
            {/* 받은 메시지일 때만 답장 및 나눔 확정 버튼 표시 */}
            {isReceivedMessage && (
              <>
                <button
                  className="message-detail__reply-button message-detail__reply-button--secondary"
                  onClick={handleConfirmPick}
                >
                  나눔 확정
                </button>
                <Link
                  to={`/messages/received/${messageId}/reply`}
                  className="message-detail__reply-button message-detail__reply-button--primary"
                >
                  답장 작성
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>메시지를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default MessageDetail;
