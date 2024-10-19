import * as request from '~/utils/request';
import { toast } from 'react-toastify';

const LoginApi = async (email, password) => {
    const data = {
        email: email,
        password: password,
    };

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.post('auth/token', data, options);
        return res;
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data;
            toast.error(`Error ${code}: ${message}`);
        } else {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};

const LoginGGApi = async (code) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            code: code,
        },
    };

    try {
        const res = await request.post('auth/oauth2/google', null, {
            headers: options.headers,
            params: options.params,
        });
        return res;
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data;
            toast.error(`Error ${code}: ${message}`);
        } else {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};

const RegisterApi = async (user) => {
    const data = {
        ...user, //spread
    };

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.post('users/register', data, options);
        return res;
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data;
            toast.error(`Error ${code}: ${message}`);
        } else {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};

const LogoutApi = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.post('auth/logout', data, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const IntrospectApi = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.post('auth/introspect', data, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// const fetchApi = async (page = 0, limit = 20) => {
//     try {
//         const res = await request.get('auth/token', {
//             params: {
//                 page: 0,
//                 limit: 20,
//             },
//         });
//     } catch (error) {}
// };

export { RegisterApi, LoginApi, LogoutApi, IntrospectApi, LoginGGApi };
