const temp = {
  userName: 'ddd',
  userID: '12535jjdsfc',
  writtenDate: '2024-09-13',
  replyTo: {
    replyTarget: 'reply',
    targetID: '1234'
  },
  replyText: `apwrgjparwjgpoarejgpoarjgpo`,
}

const ArticleReply = ({ replyObject }) => {
  return (
    <div className="reply-item">
      <div className="reply-target-indicator">{ replyObject.replyTo.replyTarget }</div>

      <div className="reply-body">
        <div className="reply-info">
          <div className="reply-user-tag">
            { replyObject.userName }
          </div>

          <p className="reply-date">{ replyObject.writtenDate }</p>
        </div>

        <div>{ replyObject.replyText }</div>

        <div className="reply-item-container">

        </div>
      </div>

      <div className="reply-item-controls">
        <button type="button" className="button-add-reply">
          댓글
        </button>
      </div>
    </div>
  );
};

export default ArticleReply;