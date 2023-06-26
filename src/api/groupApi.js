import request from "./request";
import {apiRoot} from "/src/config.json";

export async function creatGroup(groupName, level, members, token) {
    console.log("API Called: creatGroup\n", groupName, level, members);
    const {data} = await request.post(`${apiRoot}/group/create`, {
        groupName,
        level,
        members,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of creatGroup: ", data);
    return data;
}

export async function listGroups(token) {
    console.log("API Called: listGroups\n");
    const {data} = await request.get(`${apiRoot}/group/list`, {
        headers: {
            token: token,
        },
    });
    console.log("Result of listGroups: ", data);
    return data;
}

export async function addMember(groupId, members, token) {
    console.log("API Called: addMember\n", groupId, members);
    const {data} = await request.post(`${apiRoot}/group/addmember`, {
        groupId,
        members,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of addMember: ", data);
    return data;
}

export async function getMembers(groupId, token) {
    console.log("API Called: getMembers\n", groupId);
    const {data} = await request.get(`${apiRoot}/group/members`, {
        params: groupId,
        headers: {
            token: token,
        }
    });
    console.log("Result of getMembers: ", data);
    return data;
}

export async function leaveGroup(groupId, id, token) {
    console.log("API Called: leaveGroup\n", groupId);
    const {data} = await request.post(`${apiRoot}/group/leave`, {
        groupId,
        id,
    }, {
        headers: {
            token: token,
        }
    });
    console.log("Result of leaveGroup: ", data);
    return data;
}

export async function listAllGroups(token) {
    console.log("API Called: listAllGroups\n");
    const {data} = await request.get(`${apiRoot}/group/listall`, {
        headers: {
            token: token,
        }
    });
    console.log("Result of listAllGroups: ", data);
    return data;
}
