import { toast } from 'react-toastify';
import * as request from '~/utils/request';

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

export { PromotionApi };
