import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorObject }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        오류 내용
      </div>

      <button onClick={ () => navigate(-1) }>
        돌아가기
      </button>
    </div>
  );
};

export default ErrorPage;