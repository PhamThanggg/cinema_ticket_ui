import * as request from '~/utils/request';

const CinemaAreaApi = async (areaId) => {
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

const CinemaScheduleApi = async (cinemaId, movieId, screeningDate) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            cinemaId: cinemaId,
            movieId: movieId,
            screeningDate: screeningDate,
        },
    };

    try {
        const res = await request.get(`cinema/schedule`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetAllCinemaApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetAllCinemaApi, CinemaAreaApi, CinemaScheduleApi };
