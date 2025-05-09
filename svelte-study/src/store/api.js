import { customers } from "./index.js";

const callApi = async ({ method = "", path = "", data = {} } = {}) => {
    const commonUrl = "http://localhost:8080/api";
    const url = commonUrl + path;

    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json,",
    };

    const options = {
        method,
        headers,
        ...(method !== "GET" && { body: JSON.stringify(data) }),
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


const getAllUser = async () => {
    return callApi({ method: "GET", path: "/" });
};
const addUser = async (user) => {
    return callApi({ method: "POST", path: "/users", data: { ...user } });
};
const updateUser = async (user) => {
    return callApi({ method: "PATCH", path: `/something/${ user.id }`, data: { ...user } });
};
const removeUser = async () => {
    return callApi({ method: "DELETE", path: "/" });
};

const getAllTimetable = async () => {
    return callApi({ method: "GET", path: "/" });
};

const getTimetableById = async (userId) => {
    return callApi({ method: "GET", path: `/${ userId }` });
};

export {
    addUser,
};

