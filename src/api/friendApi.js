import request from "./request";
import {apiRoot} from "/src/config.json";

export async function friendRequest(friendId, token) {
    console.log("API Called: friendRequest\n", friendId);
    const {data} = await request.post(`${apiRoot}/friend/request`, {
        friendId,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of friendRequest: ", data);
    return data;
}

export async function getRequest(token) {
    // console.log("API Called: getRequest\n");
    const {data} = await request.get(`${apiRoot}/friend/getRequest`, {
        headers: {
            token: token,
        }
    });
    // console.log("Result of getRequest: ", data);
    return data;
}

// action: 1 - accept; 2 - reject
export async function handleRequestApi(friendId, action, token) {
    console.log("API Called: acceptRequest", friendId, action);
    const {data} = await request.post(`${apiRoot}/friend/accept`, {
        friendId,
        action,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of acceptRequest: ", data);
    return data;
}

export async function acceptRequest(id, friendId, action, token) {
    console.log("API Called: acceptRequest\n");
    const {data} = await request.post(`${apiRoot}/friend/accept`, {
        friendId,
        action,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of acceptRequest: ", data);
    return data;
}

export async function listFriends(token) {
    console.log("API Called: listFriends\n");
    const {data} = await request.get(`${apiRoot}/friend/list`, {
        headers: {
            token: token,
        }
    });
    console.log("Result of listFriends: ", data);
    return data;
}

export async function friendDelete(friend, token) {
    const {id, friendId} = friend;
    console.log("API Called: friendDelete\n", friend);
    const {data} = await request.post(`${apiRoot}/friend/delete`, {
        id,
        friendId,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of friendDelete: ", data);
    return data;
}

export async function listAllUsers(token) {
    console.log("API Called: listAllUsers\n");
    const {data} = await request.get(`${apiRoot}/friend/listall`, {
        headers: {
            token: token
        }
    });
    console.log("Result of listAllUsers:", data);
    return data;
}

