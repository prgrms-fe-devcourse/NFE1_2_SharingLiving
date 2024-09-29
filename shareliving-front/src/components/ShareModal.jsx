import React from 'react';
import './ShareModal.scss'; // SCSS 파일을 import

const ShareModal = ({ closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>나눔하기</h2>
                <div className="modal-buttons">
                    <button className="modal-button">나눔지식등록하기</button>
                    <button className="modal-button">나눔제품등록하기</button>
                </div>
                <button className="modal-close" onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
};

export default ShareModal;
