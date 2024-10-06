import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const API_BASE_URL = 'https://kdt.frontend.5th.programmers.co.kr:5003';

const UserControls = ({ isMobile }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useAppContext();

    const { notifications, messages } = {
        notifications: [1],
        messages: []
    };

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            setCurrentUser(null);
            console.clear();
            setMessage("");
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
            setMessage("로그아웃 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={ `header-user-area ${ isMobile ? 'on' : null }` }>
            <div className="total-search-container">
                <input type="text" name="search-value" id="txtSearch" className="input-element" placeholder="검색어 입력..." />
                <button type="button" id="btnTotalSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                </button>
            </div>

            <div className="user-info-container">
                <div className="header-notification-container" data-current-items={notifications.length}>
                    <button type="button" id="btnToggleNoti" className="togglers" title={notifications.length ? `${notifications.length}개의 확인하지 않은 알림이 있습니다.` : '새 알림 없음'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
                    </button>
                </div>

                <div className="togglers header-message-container" data-current-items={messages.length}>
                    <button type="button" id="btnToggleMessaage" className="togglers" title={messages.length ? `${messages.length}개의 확인하지 않은 메시지가 있습니다.` : '새 메시지 없음'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path></svg>
                    </button>
                </div>

                <button
                    type="button"
                    id="btnHeaderLogout"
                    className="button-with-icon front"
                    title="로그아웃"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icons" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg>
                    <span>{isLoading ? "처리 중..." : "로그아웃"}</span>
                </button>
            </div>
            {message && <p className="info-message">{message}</p>}
        </div>
    );
};

export default UserControls;