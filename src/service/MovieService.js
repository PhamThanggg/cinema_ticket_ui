import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateMovieApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('movie', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const MovieShowNowApi = async (status, page, limit) => {
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
        const res = await request.get(`movie/show/${status}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const MovieAreaShowNowApi = async (areaId, status, page, limit) => {
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
        const res = await request.get(`movie/show-area/${status}/${areaId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetMovieSearchApi = async (data) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            nameMovie: data.nameMovie,
            status: data.status,
            genreId: data.genreId,
            page: data.page,
            limit: data.limit,
        },
    };

    try {
        const res = await request.get(`movie/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const MovieDetailApi = async (movieId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`movie/${movieId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { MovieShowNowApi, MovieDetailApi, MovieAreaShowNowApi, CreateMovieApi, GetMovieSearchApi };
