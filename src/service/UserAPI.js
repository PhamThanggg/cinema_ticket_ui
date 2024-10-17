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

export { getMyInfoApi };
