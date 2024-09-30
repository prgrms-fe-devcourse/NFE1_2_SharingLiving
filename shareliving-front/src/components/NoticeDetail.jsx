// components/NoticeDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const notices = [
    { id: 1, title: '공지사항 1', content: '공지사항 1의 상세 내용입니다.' },
    { id: 2, title: '공지사항 2', content: '공지사항 2의 상세 내용입니다.' },
  ];

  const notice = notices.find((n) => n.id === Number(noticeId));

  return (
    <div>
      {notice ? (
        <div>
          <h1>{notice.title}</h1>
          <p>{notice.content}</p>
        </div>
      ) : (
        <p>공지사항을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default NoticeDetail;
