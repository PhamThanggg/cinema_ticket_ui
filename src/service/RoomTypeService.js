import * as request from '~/utils/request';

const GetRoomTypeApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get('room_type', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetRoomTypeApi };
