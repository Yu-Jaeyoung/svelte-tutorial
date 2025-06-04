const callApi = async ({ method = '', path = '', data = {} } = {}) => {
    const commonUrl = 'http://localhost:8080/api';
    const url = commonUrl + path;

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json,',
    };

    const options = {
        method,
        headers,
        ...(method !== 'GET' && { body: JSON.stringify(data) }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${ response.status }`);
        }
        const responseData = await response.json();
        console.log(options);
        console.log(responseData);
        return responseData;
    } catch (error) {
        throw error;
    }
};


const addUser = async (user) => {
    return callApi({ method: 'POST', path: '/users', data: { ...user } });
};

const getAllTimetable = async () => {
    return callApi({ method: 'GET', path: '/timetables' });
};

const getTimetableById = async (userId) => {
    return callApi({ method: 'GET', path: `/timetables/${ userId }` });
};

const patchTimetableById = async (data) => {
    return callApi({ method: 'PATCH', path: `/timetables/${ data.id }`, data: { ...data } });
};

const deleteTimetableByIds = async (userId, data) => {
    return callApi({ method: 'DELETE', path: `/timetables/${ userId }/detail`, data: { ...data } });
};

const addSchedule = async (schedule) => {
    return callApi({ method: 'POST', path: `/timetables`, data: { ...schedule } });
};

export {
    addUser,
    getTimetableById,
    getAllTimetable,
    patchTimetableById,
    addSchedule,
    deleteTimetableByIds,
};

