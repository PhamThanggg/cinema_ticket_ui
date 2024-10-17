import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { IntrospectApi } from '~/service/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        case 'REFRESH_TOKEN':
            return { ...state, user: action.payload, isAuthenticated: true };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const validToken = await IntrospectApi(token);
                    if (validToken && validToken.result.introspect) {
                        dispatch({ type: 'LOGIN', payload: validToken });
                        console.log(validToken);
                    } else {
                        logout();
                        toast.error('Phiên đăng nhập đã hết vui lòng đăng nhập lại');
                    }
                } catch (error) {
                    console.error('Lỗi khi kiểm tra token:', error);
                    logout();
                }
            }
        };
        checkToken();
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        dispatch({ type: 'LOGIN', payload: userData });
    };

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({ type: 'LOGOUT' });
    };

    return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
