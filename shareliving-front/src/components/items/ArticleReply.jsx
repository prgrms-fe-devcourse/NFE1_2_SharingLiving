const ArticleReply = ({ replyObject, children }) => {
  return (
    <div className="reply-item">
      <div className={ `reply-target-indicator ${ replyObject.replyTo.replyTarget === 'reply' ? 're-reply' : null }` }>
        <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M4.99989 13.9999L4.99976 5L6.99976 4.99997L6.99986 11.9999L17.1717 12L13.222 8.05024L14.6362 6.63603L21.0001 13L14.6362 19.364L13.222 17.9497L17.1717 14L4.99989 13.9999Z"></path></svg>
      </div>

      <div className="reply-body">
        <div className="reply-info">
          <div className="reply-user-tag">
            { replyObject.userName }
          </div>

          <span>·</span>

          <p className="reply-date">{ replyObject.writtenDate }</p>
        </div>

        <div className="reply-text">{ replyObject.replyText }</div>

        <div className="reply-item-container">
          { children }

          { /** 대댓글 컨테이너 */ }
        </div>

        { replyObject.replyTo.replyTarget === 'article' ?
          <div className="reply-item-controls">
            <button type="button" className="button-add-reply">
              대댓글 작성하기
            </button>
          </div>
          :
          <div className="reply-to-reply">
            To. <span>{ replyObject.replyTo.replyTarget }</span>
          </div>
        }
      </div>
    </div>
  );
};

export default ArticleReply;