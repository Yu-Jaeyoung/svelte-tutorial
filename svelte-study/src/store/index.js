import { writable } from "svelte/store";
import { addUser } from "./api.js";

function setCustomers() {
    const { subscribe, set } = writable([]);

    const fetch = async () => {
        const result = await getCustomers();
        console.log(result);
        set(result);
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

    const result = await

    return {
        add,
    };
}

export const customers = setCustomers();
export const users = setUsers();
