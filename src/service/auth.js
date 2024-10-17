import * as request from '~/utils/request';

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
        console.log(error);
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
        console.log(error);
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

export { RegisterApi, LoginApi, LogoutApi, IntrospectApi };
