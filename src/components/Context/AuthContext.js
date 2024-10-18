import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { IntrospectApi } from '~/service/auth';
import { toast } from 'react-toastify';
import { getMyInfoApi } from '~/service/UserAPI';
import Loading from '../Loading';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false, account: null };
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        case 'REFRESH_TOKEN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: !!localStorage.getItem('token'),
        account: null,
        loading: true, // Thêm state loading
    });

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const validToken = await IntrospectApi(token);
                    if (validToken && validToken.result.introspect) {
                        dispatch({ type: 'LOGIN', payload: validToken });
                        await getMyInfo(token);
                    } else {
                        logout();
                        toast.error('Phiên đăng nhập đã hết, vui lòng đăng nhập lại.');
                    }
                } catch (error) {
                    console.error('Lỗi khi kiểm tra token:', error);
                    logout();
                }
            } else {
                dispatch({ type: 'LOADING', payload: false });
            }
        };
        checkToken();
    }, []);

    const getMyInfo = async (token) => {
        try {
            const getAcc = await getMyInfoApi(token);
            dispatch({ type: 'SET_ACCOUNT', payload: getAcc });
        } catch (error) {
            console.log('Error fetching data:', error);
        } finally {
            dispatch({ type: 'LOADING', payload: false }); // Đặt loading về false sau khi hoàn thành
        }
    };

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        dispatch({ type: 'LOGIN', payload: userData });
        getMyInfo(userData.token); // Lấy thông tin người dùng ngay khi đăng nhập
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    // Đảm bảo rằng component con chỉ hiển thị khi không còn loading
    if (state.loading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
