import * as request from '~/utils/request';

const GetMoviePeopleApi = async (name, roleTypeId, page, limit) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            name: name,
            roleTypeId: roleTypeId,
            page: page,
            limit: limit,
        },
    };

    try {
        const res = await request.get('moviePeople', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const GetDirectorApi = async () => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await request.get('moviePeople', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { GetMoviePeopleApi, GetDirectorApi };
