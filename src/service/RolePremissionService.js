import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateRoleApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('roles', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const GetRoleApi = async (token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.get(`roles`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const RoleSearchApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: data.name,
            page: data.page,
            limit: data.limit,
        },
    };

    try {
        const res = await request.get(`roles/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const UpdateRoleApi = async (roleId, data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`roles/${roleId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteRoleApi = async (roleId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`roles/${roleId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const GetPermissionApi = async (token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.get(`permission`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { UpdateRoleApi, DeleteRoleApi, CreateRoleApi, GetPermissionApi, RoleSearchApi, GetRoleApi };
