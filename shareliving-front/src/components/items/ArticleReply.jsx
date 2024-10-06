const ArticleReply = ({ replyObject }) => {
  return (
    <div className="reply-item">
      <div>{ replyObject.replyText }</div>
    </div>
  );
};

export default ArticleReply;