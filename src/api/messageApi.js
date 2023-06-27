import request from "./request";
import {apiRoot} from "/src/config.json";

export async function sendMessage(friendId, message, token) {
    console.log("API Called: sendMessage\n", friendId, message);
    const {data} = await request.post(`${apiRoot}/friend/sendmsg`, {
        friendId,
        message,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of sendMessage: ", data);
    return data;
}

export async function friendHistoryMessage(friendId, token) {
    console.log("API Called: friendHistoryMessage\n", friendId);
    const {data} = await request.get(`${apiRoot}/friend/historymsg`, {
        params: {
            friendId
        },
        headers: {
            token: token,
        }
    });
    console.log("Result of friendHistoryMessage: ", data);
    return data;
}

export async function sendGroupMessage(groupId, message, token) {
    console.log("API Called: sendGroupMessage\n", groupId, message);
    const {data} = await request.post(`${apiRoot}/group/sendmsg`, {
        groupId,
        message,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of sendGroupMessage: ", data);
    return data;
}

export async function groupHistoryMessage(groupId, token) {
    console.log("API Called: groupHistoryMessage", groupId);
    const {data} = await request.get(`${apiRoot}/group/historymsg`, {
        params: {
            groupId
        },
        headers: {
            token: token,
        }
    });
    console.log("Result of groupHistoryMessage: ", data);
    return data;
}

export async function newFriendMessages(timeStr, token) {
    console.log("API Called: newFriendMessages", timeStr);
    const {data} = await request.get(`${apiRoot}/friend/`)
}
