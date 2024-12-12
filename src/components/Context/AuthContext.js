import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { IntrospectApi } from '~/service/auth';
import { toast } from 'react-toastify';
import { getMyInfoApi } from '~/service/UserAPI';
import Loading from '../Loading';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isAdmin: action.payload.isAdmin,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false, account: null, loading: false, isAdmin: false };
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
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: !!localStorage.getItem('token'),
        isAdmin: false,
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
                        const isAdmin = permissions.some((perm) => permissionss.includes(perm));

                        dispatch({ type: 'LOGIN', payload: { ...validToken, token, isAdmin } });
                        dispatch({ type: 'SET_PERMISSION', payload: permissions });
                        await getMyInfo(token);
                    } else {
                        handleLogoutAndRedirect();
                    }
                } catch (error) {
                    console.error('Lỗi khi kiểm tra token:', error);
                    handleLogoutAndRedirect();
                } finally {
                    dispatch({ type: 'LOADING', payload: false });
                }
            } else {
                dispatch({ type: 'LOADING', payload: false });
            }
        };
        checkToken();
    }, []);

    useEffect(() => {
        const checkToken = () => {
            const token = state.token;
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    handleLogoutAndRedirect();
                }
            }
        };

        const intervalId = setInterval(checkToken, 5 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [state.token, navigate]);

    const handleLogoutAndRedirect = () => {
        logout();
        toast.error('Phiên đăng nhập đã hết, vui lòng đăng nhập lại.');
        navigate('/');
    };

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
        const isAdmin = permissions.some((perm) => permissionss.includes(perm));

        dispatch({ type: 'LOGIN', payload: { user: userData, token: userData.token, isAdmin } });
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
    const permissionss = [
        'ROLE_ADMIN',
        'MANAGE_SEAT',
        'MANAGE_SHOWTIME',
        'MANAGE_ACCOUNT',
        'MANAGE_REPORT',
        'MANAGE_TICKET',
        'MANAGE_ITEM',
        'CHECK_TICKET',
        'MANAGE_MOVIE',
    ];

    if (state.loading) {
        return <Loading />;
    }

    return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
