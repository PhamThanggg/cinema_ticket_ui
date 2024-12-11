import { toast } from 'react-toastify';
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

const GetSeatSelectApi = async (scheduleId, status, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            schedule_id: scheduleId,
            status: status,
        },
    };

    try {
        const res = await request.get(`cinema_seat/seatBooked`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetSeatBoughtApi = async (scheduleId, status, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            schedule_id: scheduleId,
            status: status,
        },
    };

    try {
        const res = await request.get(`cinema_seat/seatBought`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const updateSeatStatus = async (data, token) => {
    // booking
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
    // booking
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

const UpdateSeat = async (data, seatId, token) => {
    // booking
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`cinema_seat/${seatId}`, data, {
            headers: options.headers,
        });
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const CreateSeat = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post(`cinema_seat`, data, {
            headers: options.headers,
        });
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteSeat = async (seatId, token) => {
    // booking
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`cinema_seat/${seatId}`, {
            headers: options.headers,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export {
    DeleteSeat,
    CreateSeat,
    UpdateSeat,
    GetSeatBoughtApi,
    GetSeatApi,
    updateSeatStatus,
    deleteSeatStatus,
    GetSeatSelectApi,
    GetSeatRoomApi,
};
