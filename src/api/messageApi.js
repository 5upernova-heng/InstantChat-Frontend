import request from "./request";
import {apiRoot} from "/src/config.json";

export async function sendMessage(friend, message, token) {
    const {id, friendId} = friend;
    console.log("API Called: sendMessage\n", friend, message);
    const {data} = await request.post(`${apiRoot}/friend/sendmsg`, {
        id,
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

export async function sendGroupMessage(id, groupId, message, token) {
    console.log("API Called: sendGroupMessage\n", id, groupId, message);
    const {data} = await request.post(`${apiRoot}/group/sendmsg`, {
        id,
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
    console.log("API Called: groupHistoryMessage\n", groupId);
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

export async function newFriendMessages(time, token) {
    console.log("API Called: newFriendMessages", time);
    const {data} = await request.get(`${apiRoot}/friend/newMessage`, {
        params: {
            time,
        },
        headers: {
            token: token,
        }
    });
    console.log("Result of newFriendMessages:", data);
    return data;

}

export async function newGroupMessages(time, token) {
    console.log("API Called: newGroupMessages", time);
    const {data} = await request.get(`${apiRoot}/group/newMessage`, {
        params: {
            time,
        },
        headers: {
            token: token,
        }
    });
    console.log("Result of newGroupMessages:", data);
    return data;
}
