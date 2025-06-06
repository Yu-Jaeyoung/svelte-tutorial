import {
    addSchedule,
    addUser,
    deleteTimetableByIds,
    getAllTimetable,
    getTimetableById,
    patchTimetableById,
} from './api.js';

function setUsers() {
    const add = async (user) => {
        await addUser(user);
    };

    return {
        add,
    };
}

function setTimetable() {
    const getTimetableByUserId = async (userId) => {
        return await getTimetableById(userId);
    };

    const getAllTimetables = async () => {
        return await getAllTimetable();
    };

    const patchTimeTableById = async (
        schedule,
    ) => {
        return await patchTimetableById(schedule);
    };

    const addTimetable = async (schedule) => {
        return await addSchedule(schedule);
    };

    const deleteTimetableByIdAndTimetableId = async (userId, schedule) => {
        return await deleteTimetableByIds(userId, schedule);
    };

    return {
        getTimetableByUserId,
        getAllTimetables,
        addTimetable,
        patchTimeTableById,
        deleteTimetableByIdAndTimetableId,
    };
}

export const users = setUsers();
export const timetable = setTimetable();