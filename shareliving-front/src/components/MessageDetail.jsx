// components/MessageDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './MessageDetail.scss'; // SCSS 파일 import

const MessageDetail = ({ messages, sentMessages }) => {
  const { messageId } = useParams();

  // 메시지가 보낸 메시지 리스트에 있는지, 받은 메시지 리스트에 있는지 구분
  const messageIndex = messages.findIndex(
    (msg) => msg.id === Number(messageId)
  );
  const sentMessageIndex = sentMessages.findIndex(
    (msg) => msg.id === Number(messageId)
  );

  // 보낸 메시지인지 여부 확인
  const isSentMessage = sentMessageIndex !== -1;

  // 현재 메시지 구하기 (보낸 메시지 or 받은 메시지)
  const currentMessage = isSentMessage
    ? sentMessages[sentMessageIndex]
    : messages[messageIndex];

  // 이전, 다음 메시지 구하기 (각각 리스트 내에서만)
  const previousMessage = isSentMessage
    ? sentMessages[sentMessageIndex - 1] || null
    : messages[messageIndex - 1] || null;
  const nextMessage = isSentMessage
    ? sentMessages[sentMessageIndex + 1] || null
    : messages[messageIndex + 1] || null;

  return (
    <div className="message-detail">
      <h2>메시지 상세 내용</h2>
      {currentMessage ? (
        <div className="message-detail__content">
          <h3>{currentMessage.subject}</h3>
          <p>{currentMessage.body}</p>
          <p>
            {isSentMessage
              ? `받는 사람: ${currentMessage.recipient}`
              : `보낸 사람: ${currentMessage.sender}`}
          </p>

          {/* 이전/다음 메시지 링크: 각각의 리스트 내에서만 탐색 */}
          <div className="message-detail__navigation">
            {previousMessage && (
              <Link
                to={`/messages/${previousMessage.id}`}
                className="message-detail__link"
              >
                이전 메시지
              </Link>
            )}
            {nextMessage && (
              <Link
                to={`/messages/${nextMessage.id}`}
                className="message-detail__link"
              >
                다음 메시지
              </Link>
            )}
          </div>

          {/* 답장 버튼은 받은 메시지에만 표시 */}
          {!isSentMessage && (
            <Link to={`/messages/${messageId}/reply`}>
              <button className="message-detail__reply-button">
                답장 작성
              </button>
            </Link>
          )}
        </div>
      ) : (
        <p>메시지를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default MessageDetail;
