import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { IntrospectApi } from '~/service/auth';
import { toast } from 'react-toastify';
import { getMyInfoApi } from '~/service/UserAPI';
import Loading from '../Loading';
import { jwtDecode } from 'jwt-decode';

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
        case 'SET_PERMISSION':
            return { ...state, permission: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: !!localStorage.getItem('token'),
        account: null,
        permission: [],
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
                        const permissions = parsePermissionsFromToken(token);

                        dispatch({ type: 'LOGIN', payload: { ...validToken, token } });
                        dispatch({ type: 'SET_PERMISSION', payload: permissions });
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
        const permissions = parsePermissionsFromToken(userData.token);

        dispatch({ type: 'LOGIN', payload: userData });
        dispatch({ type: 'SET_PERMISSION', payload: permissions });
        getMyInfo(userData.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    const parsePermissionsFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.scope ? decoded.scope.split(' ') : [];
        } catch (error) {
            console.error('Error decoding token:', error);
            return [];
        }
    };

    if (state.loading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
