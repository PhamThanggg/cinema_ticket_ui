import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const GetCinemaRoomApi = async (name, cinemaId, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            name: name,
            cinema_id: cinemaId,
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get('cinema_room/search', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetCinemaRoomIdApi = async (cinemaId, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema_room/${cinemaId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetAllCinemaRoomApi = async (cinemaId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema_room/cinema/${cinemaId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const CreateCinemaRoomApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('cinema_room', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { GetAllCinemaRoomApi, GetCinemaRoomApi, CreateCinemaRoomApi, GetCinemaRoomIdApi };
