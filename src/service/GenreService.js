import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateGenreApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('genre', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const GetGenreApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`genre`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GenreDetailApi = async (GenreId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`Genre/${GenreId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GenreDetailApi, GetGenreApi, CreateGenreApi };
