import * as request from '~/utils/request';

const getMyInfoApi = async (token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.get(`users/myInfo`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const getUserSearchApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: data.page,
            limit: data.limit,
            name: data.name,
            email: data.email,
        },
    };

    try {
        const res = await request.get(`users/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { getUserSearchApi, getMyInfoApi };
