import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const getMyInfoApi = async (token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.get(`users/myInfo`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getUserSearchApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: data.page,
            limit: data.limit,
            name: data.name,
            email: data.email,
            roleId: data.roleId,
        },
    };

    try {
        const res = await request.get(`users/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const UpdateUserApi = async (data, userId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`users/${userId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdatePasswordApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`users/change-pass`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const AddRoleApi = async (userId, data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`users/addRole/${userId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteUser = async (userId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`users/${userId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { DeleteUser, AddRoleApi, UpdatePasswordApi, UpdateUserApi, getUserSearchApi, getMyInfoApi };
