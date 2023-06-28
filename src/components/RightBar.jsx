// 上方用于显示好友请求
// 下方用于显示成员信息

import {useContext, useEffect, useState} from "react";
import UserCard from "./UserCard.jsx";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import Avatar from "./Avatar.jsx";

function RightBar() {
    const {loginAccount} = useContext(LoginContext);
    const {
        mode, conversation, allUsers, findMembersById,
        setConversation, chats, setChats, setMode,
        newMessages, friendRequests, handleRequest,
        findUserById, joinGroup
    } = useContext(ChatContext);

    const [members, setMembers] = useState([]);
    const [outsideUsers, setOutsideUsers] = useState([]);

    const loadMember = async () => {
        if (mode === 0) {
            setMembers([]);
            setOutsideUsers([]);
            return;
        }
        const newMembers = await findMembersById(conversation);
        setMembers(newMembers);
        console.log(allUsers);
        console.log(newMembers);
        const outside = allUsers.filter((user) => {
            const index = newMembers.findIndex((member) => member.id === user.id);
            console.log(index)
            return index === -1;
        })
        console.log(outside);
        setOutsideUsers(outside);

    }
    useEffect(
        () => {
            loadMember();
        }, [conversation]
    )

    const jumpToChat = (user) => {
        if (user.id === loginAccount.id)
            return;

        setMode(0);
        let flag = 0;
        chats.map((chat) => {
            if (chat.id === user.id) {
                setConversation(chat.id);
                flag = 1;
            }
        });
        if (flag === 0) {
            const newChats = chats;
            newChats.push({id: user.id, type: 0, name: user.name});
            setChats(newChats);
            setConversation(user.id);
        }
    };

    const renderFriendRequest = () => {
        if (friendRequests.length === 0) return null;
        return (
            <>
                <h4 className="fw-bold text-center pt-2">您有新的好友请求</h4>
                <div className="d-flex flex-column gap-3">
                    {friendRequests.map((user, index) => (
                        <div key={index} className="px-2 d-flex align-items-center">
                            <UserCard name={user.name}/>
                            <div className="d-flex justify-content-evenly gap-2">
                                <button className="btn btn-sm btn-success shadow"
                                        onClick={() => handleRequest(user.id, 1)}
                                ><i className="fa fa-check" aria-hidden="true"></i>
                                </button>
                                <button className="btn btn-sm btn-danger shadow"
                                        onClick={() => handleRequest(user.id, 2)}
                                ><i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="mb-0"/>
            </>
        );
    };

    const renderNewMessages = () => {
        if (newMessages.length === 0) return (
            <>
                <h4 className="fw-bold text-center pt-2">新的消息</h4>
                <h5 className="text-center">暂无新的消息</h5>
                <hr className="mb-0"/>
            </>
        );
        else return (
            <>
                <div className="d-flex flex-column gap-3">
                    {newMessages.map((newMessage, index) => (
                        <div
                            key={index}
                            style={{cursor: "pointer"}}
                            className="px-2 d-flex align-items-center"
                            onClick={() => {
                                jumpToChat(findMembersById(newMessage.id));
                            }}
                        >
                            <UserCard name={findUserById(newMessage.id).name}/>
                        </div>
                    ))}
                </div>
                <hr className="mb-0"/>
            </>
        );
    };

    const renderMemberList = () => {
        if (mode === 0) return null;
        return (
            <>
                <h4 className="fw-bold text-center pt-2">成员列表</h4>
                <div className="d-flex flex-column gap-3">
                    {members.map((user, index) => (
                        <div key={index} style={{cursor: "pointer"}}
                             className="px-2 d-flex align-items-center" onClick={() => {
                            jumpToChat(user);
                        }}>
                            <UserCard name={user.name}/>
                        </div>
                    ))}
                </div>
                <hr className="mb-0"/>
            </>
        );
    };

    const renderAddMemberList = () => {
        if (mode === 0 || outsideUsers.length === 0) return null;
        return (
            <>
                <h4 className="fw-bold text-center pt-2">邀请更多人加入群聊</h4>
                <div className="d-flex flex-column gap-3">
                    {outsideUsers.map((user, index) => (
                        <span key={index} style={{cursor: "pointer"}}
                              className="px-2 d-flex align-items-center" onClick={async () => {
                            const code = await joinGroup(conversation, [user.id]);
                            if (code) loadMember();
                        }}>
                            <Avatar name={user.name} size={"sm"}/>
                        </span>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div>
            {renderFriendRequest()}
            {renderNewMessages()}
            {renderMemberList()}
            {renderAddMemberList()}
        </div>
    );
}

export default RightBar;
