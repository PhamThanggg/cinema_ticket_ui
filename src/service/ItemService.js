import * as request from '~/utils/request';

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

export { GetItemApi };
