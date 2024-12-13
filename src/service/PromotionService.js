import { toast } from 'react-toastify';
import * as request from '~/utils/request';

const CreatePromotionApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('promotion', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const CreatePromotionInfoApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('promotion/info', data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const PromotionApi = async (name) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get(`promotion/${name}`, options);
        return res;
    } catch (error) {
        if (error.response) {
            const { message } = error.response.data;
            toast.error(` ${message}`);
        } else {
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};

const PromotionSearchApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: data.name,
            promotionType: data.promotionType,
            status: data.status,
            page: data.page,
            limit: data.limit,
        },
    };

    try {
        const res = await request.get(`promotion`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const PromotionSearchNameApi = async (name, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            name: name,
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get(`promotion/info`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const UpdatePromotionApi = async (data, promotionId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`promotion/${promotionId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdatePromotionInfoApi = async (data, promotionId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.put(`promotion/info/${promotionId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const DeletePromotionApi = async (promotionId, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.remove(`promotion/${promotionId}`, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const UpdateImageProApi = async (data, promotionId, token) => {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post(`promotion/upload_images/${promotionId}`, data, options);
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export {
    PromotionSearchNameApi,
    UpdateImageProApi,
    DeletePromotionApi,
    UpdatePromotionApi,
    UpdatePromotionInfoApi,
    CreatePromotionApi,
    CreatePromotionInfoApi,
    PromotionSearchApi,
    PromotionApi,
};
