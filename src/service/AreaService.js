import * as request from '~/utils/request';

const GetAreaApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get('area', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetAreaApi };
