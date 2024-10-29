import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { IntrospectApi } from '~/service/auth';
import { toast } from 'react-toastify';
import { getMyInfoApi } from '~/service/UserAPI';
import Loading from '../Loading';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true, token: action.payload.token };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false, account: null };
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        case 'REFRESH_TOKEN':
            return { ...state, user: action.payload, isAuthenticated: true, token: action.payload.token };
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
        loading: true,
        token: localStorage.getItem('token'),
    });

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const validToken = await IntrospectApi(token);
                    if (validToken && validToken.result.introspect) {
                        dispatch({ type: 'LOGIN', payload: { ...validToken, token } });
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
            dispatch({ type: 'LOADING', payload: false });
        }
    };

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        dispatch({ type: 'LOGIN', payload: userData });
        getMyInfo(userData.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    if (state.loading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
