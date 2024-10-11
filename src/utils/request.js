import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, dataRes, options = {}) => {
    try {
        const response = await request.post(path, dataRes, options);
        return response.data;
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
};

export const put = async (path, dataRes, options = {}) => {
    const response = await request.put(path, dataRes, options);
    return response.data;
};

export const remove = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

export default request;
