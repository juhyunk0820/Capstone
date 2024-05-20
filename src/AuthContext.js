// AuthContext.js
import React, { createContext, useContext, useEffect } from 'react';
import useStore from './Store/tokenStore';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { token, setToken, clearToken } = useStore();
    const navigate = useNavigate();

    const login = async (username, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            navigate('/mypage');
        } else {
            alert('로그인 실패');
        }
    };

    const logout = () => {
        clearToken();
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
