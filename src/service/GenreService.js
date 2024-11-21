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
        const res = await request.get(`genre/${GenreId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GenreSearchApi = async (data) => {
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
        const res = await request.get(`genre/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const UpdateGenreApi = async (data, genreId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`genre/${genreId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteGenreApi = async (genreId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`genre/${genreId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { DeleteGenreApi, UpdateGenreApi, GenreSearchApi, GenreDetailApi, GetGenreApi, CreateGenreApi };
