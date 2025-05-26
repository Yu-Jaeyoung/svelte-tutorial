import { addSchedule, addUser, getAllTimetable, getTimetableById, patchTimetableById } from "./api.js";

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
        userId, schedule,
    ) => {
        return await patchTimetableById(userId, schedule);
    };

    const addTimetable = async (schedule) => {
        return await addSchedule(schedule);
    };

    return {
        getTimetableByUserId,
        getAllTimetables,
        addTimetable,
        patchTimeTableById,
    };
}

export const users = setUsers();
export const timetable = setTimetable();