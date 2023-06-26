import request from "./request";
import {apiRoot} from "/src/config.json";

// 用于修改用户的昵称和密码
export async function uploadUserInfo(id, name, password, token) {
    console.log("API Called: uploadUserInfo\n", id, name, password);
    const {data} = await request.put(`${apiRoot}/setting/upload`, {
        id,
        name,
        password,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of uploadUserInfo: ", data);
    return data;
}