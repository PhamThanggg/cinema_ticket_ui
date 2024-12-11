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

const MovieAreaShowNowApi = async (areaId, status, genreId, name, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            page: page,
            limit: limit,
            status: status,
            areaId: areaId,
            genreId: genreId,
            name: name,
        },
    };

    try {
        const res = await request.get(`movie/show-movie`, options);
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

const UpdateMovieApi = async (data, movieId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`movie/${movieId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdateImageApi = async (data, movieId, token) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post(`movie/upload_images/${movieId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteImageApi = async (imageId, token) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
        params: {
            ids: imageId,
        },
    };

    try {
        const res = await request.remove(`movie/image`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteMovieApi = async (imageId, token) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`movie/${imageId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const MovieShowNowAllApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`movie/show-now`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export {
    MovieShowNowAllApi,
    DeleteMovieApi,
    DeleteImageApi,
    UpdateImageApi,
    MovieShowNowApi,
    MovieDetailApi,
    MovieAreaShowNowApi,
    CreateMovieApi,
    GetMovieSearchApi,
    UpdateMovieApi,
};
