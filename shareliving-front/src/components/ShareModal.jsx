import { useNavigate } from 'react-router-dom';
import './ShareModal.scss';

const ShareModal = ({ closeModal }) => {
    const navigate = useNavigate();

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>나눔하기</h2>
                <div className="modal-buttons">
                    <button className="modal-button" onClick={() => {navigate('/knowledge');}}>나눔지식등록하기</button>
                    <button className="modal-button" onClick={() => {navigate('/product');}}>나눔제품등록하기</button>
                </div>
                <button className="modal-close" onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
};

export default ShareModal;