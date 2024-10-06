// components/NoticeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NoticeList.scss';

const NoticeList = () => {
  const notices = [
    { id: 1, title: '공지사항 1' },
    { id: 2, title: '공지사항 2' },
  ];

  return (
    <div className="notice-wrapper">
      <h1 className="title">공지사항 목록</h1>
      <ul className="notice-form">
        {notices.map((notice) => (
          <li key={notice.id} className="form-group">
            <Link to={`/notices/${notice.id}`}>{notice.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
