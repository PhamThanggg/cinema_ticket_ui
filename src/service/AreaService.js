import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateAreaApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('area', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const GetAreaApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get('area', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const AreaSearchApi = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            name: data.name,
            page: data.page,
            limit: data.limit,
        },
    };

    try {
        const res = await request.get(`area/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const DeleteAreaApi = async (areaId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`area/${areaId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdateAreaApi = async (data, areaId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`area/${areaId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { CreateAreaApi, UpdateAreaApi, DeleteAreaApi, AreaSearchApi, GetAreaApi };
