import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreateScheduleApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('schedule', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const ScheduleApi = async (status, page, limit) => {
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

const ScheduleSearchApi = async (roomId, screeningDate, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            roomId: roomId,
            screeningDate: screeningDate,
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get(`schedule/search`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetcheduleIdApi = async (id) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`schedule/${id}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const UpdateScheduleApi = async (data, scheduleId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`schedule/${scheduleId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeleteScheduleApi = async (scheduleId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`schedule/${scheduleId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export { DeleteScheduleApi, UpdateScheduleApi, GetcheduleIdApi, CreateScheduleApi, ScheduleApi, ScheduleSearchApi };
