// // Login 컴포넌트
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import { useAuth } from '../../AuthContext';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { setIsLoggedIn } = useAuth();

//     const handleLogin = async () => {
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             setIsLoggedIn(true);
//             navigate('/mypage');
//         } else {
//             alert('로그인 실패');
//         }
//     };

//     const handleRegister = async () => {
//         const response = await fetch('/api/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             alert('회원가입 성공');
//         } else {
//             alert('회원가입 실패');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>로그인</h2>
//             <input
//                 type="text"
//                 placeholder="아이디"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="비밀번호"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//             <div className="login-footer">
//                 <span>아이디 찾기</span> | <span>비밀번호 찾기</span> | <span onClick={handleRegister}>회원가입</span>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../AuthContext';
import Header from '../Header/Header';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setIsLoggedIn(true);
            navigate('/mypage');
        } else {
            alert('로그인 실패');
        }
    };

    const handleRegister = async () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <div>
                <Header/>
            </div>
            <div className="login-form">
                <h2>로그인</h2>
                <div className="form-group">
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>Login</button>
                <div className="login-links">
                    <span>아이디 찾기</span> | <span>비밀번호 찾기</span> | <span onClick={handleRegister}>회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
