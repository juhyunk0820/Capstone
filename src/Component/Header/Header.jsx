import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../Store/tokenStore';
import './Header.css';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import logo from '../../images/Fossil.png';
import logo_mypage from '../../images/logo_mypage.png'

function Header() {
  const { token, clearToken } = useStore();
  const userId = "user123"; // 예시, 실제로는 서버에서 가져옴

  const handleLogout = () => {
    clearToken();
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="fossil_Logo" />
        </Link>
      </div>
      <div className="menu">
        {!token ? (
          <>
            <Link to="/login" element={<Login/>}>로그인</Link>
            <Link to="/signup" element={<Signup/>}>회원가입</Link>
          </>
        ) : (
          <div className="user-menu">
            <div className="user-info">
              <img src={logo_mypage} alt="Mypage Logo" />
              <span>{userId}</span>
            </div>
            <div className="dropdown-menu">
              <Link to="/mypage">마이페이지</Link>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
