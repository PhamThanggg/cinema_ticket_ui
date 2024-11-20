import * as request from '~/utils/request';

const GetSeatApi = async (scheduleId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            schedule_id: scheduleId,
        },
    };

    try {
        const res = await request.get(`cinema_seat`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetSeatRoomApi = async (roomId) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`cinema_seat/room/${roomId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetSeatSelectApi = async (scheduleId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            schedule_id: scheduleId,
        },
    };

    try {
        const res = await request.get(`cinema_seat/seatBooked`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const updateSeatStatus = async (data, token) => {
    // console.log(data.expiry_time);
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post(`seat_reservation`, data, {
            headers: options.headers,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

const deleteSeatStatus = async (data, scheduleId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`seat_reservation/${data}/${scheduleId}`, {
            headers: options.headers,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetSeatApi, updateSeatStatus, deleteSeatStatus, GetSeatSelectApi, GetSeatRoomApi };
