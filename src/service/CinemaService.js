import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const GetCinemaApi = async (name, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get('cinema/search', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetCinemaIdApi = async (cinemaId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema/${cinemaId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetCinemaAreaApi = async (areaId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema/area/${areaId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const CreateCinemaApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('cinema', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteCinemaApi = async (cinemaId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`cinema/${cinemaId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { DeleteCinemaApi, GetCinemaAreaApi, GetCinemaApi, CreateCinemaApi, GetCinemaIdApi };
