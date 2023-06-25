import request from "./request";
import {apiRoot} from "/src/config.json";

export async function login(account) {
    const {username, password} = account;
    const {data} = await request.post(`${apiRoot}/login`, {
        params: {
            username,
            password,
        },
    });
    return data;
}
