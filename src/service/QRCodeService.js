import * as request from '~/utils/request';

const GetQRCodeApi = async (invoiceId, text, token) => {
    const options = {
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
        params: {
            invoiceId: invoiceId,
            text: text,
        },
    };

    try {
        const res = await request.get('qr-code', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetQRCodeApi };
