import request from "./request";
import {apiRoot} from "/src/config.json";

export async function login(account) {
    const {username, password} = account;
    console.log("API Called: login\n", account);
    const {data} = await request.post(`${apiRoot}/login`, {
        username,
        password,
    });
    console.log("Result of login: ", data);
    return data;
}
