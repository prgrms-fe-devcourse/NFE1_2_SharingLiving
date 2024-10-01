// src/hooks/useAuth.js
import { createContext, useContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 상태

  const login = (userData) => {
    setUser(userData); // 사용자 데이터 저장
  };

  const logout = () => {
    setUser(null); // 사용자 데이터 초기화
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
