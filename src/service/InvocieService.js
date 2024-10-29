import * as request from '~/utils/request';

const CreateInvoiceApi = async (data, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await request.post('invoice', data, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetInvoiceApi = async (page, limit, token) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get('invoice/my-invoice', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { CreateInvoiceApi, GetInvoiceApi };
