import request from "./request";
import {apiRoot} from "/src/config.json";

export async function register(account) {
    const {username, name, password} = account;
    console.log("API Called: register\n", account);
    const {data} = await request.post(`${apiRoot}/register`, {
        username,
        name,
        password,
    }) ;
    console.log("Result of register: ", data);
    return data;
}