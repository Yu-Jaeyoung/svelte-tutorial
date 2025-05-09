import { writable } from "svelte/store";
import { addUser, getAllTimetable, getTimetableById } from "./api.js";

function setCustomers() {
    const { subscribe, set } = writable([]);

    const fetch = async () => {
        // const result = await getCustomers();
        // console.log(result);
        // set(result);
    };

    return {
        subscribe,
        fetch,
    };
}

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

    return {
        getTimetableByUserId,
        getAllTimetables,
    };
}

export const customers = setCustomers();
export const users = setUsers();
export const timetable = setTimetable();