import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateItemApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('item', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdateItemApi = async (data, itemId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`item/${itemId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const GetItemApi = async (cinemaId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            cinemaId: cinemaId,
        },
    };

    try {
        const res = await request.get(`item`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetItemByIdApi = async (comboId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`item/${comboId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { CreateItemApi, UpdateItemApi, GetItemByIdApi, GetItemApi };
