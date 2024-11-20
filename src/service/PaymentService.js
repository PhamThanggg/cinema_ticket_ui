import * as request from '~/utils/request';

const PaymentVNPay = async (orderId, amount, remainingMinutes, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            orderId: orderId,
            amount: amount,
            timePay: remainingMinutes,
            orderInfo: 'Mua_ve_xem_phim',
            orderType: 'ticket',
            returnUrl: 'http://localhost:3000/Booking/Confirmation',
        },
    };

    try {
        const res = await request.post('payment/create', options.data, { headers: options.headers });
        return res;
    } catch (error) {
        console.log(error);
    }
};

const ConfirmPayment = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('payment/vnpay-callback', data, { headers: options.headers });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { PaymentVNPay, ConfirmPayment };
