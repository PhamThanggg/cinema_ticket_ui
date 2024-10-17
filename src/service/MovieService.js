import * as request from '~/utils/request';

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

export { MovieShowNowApi, MovieDetailApi, MovieAreaShowNowApi };
