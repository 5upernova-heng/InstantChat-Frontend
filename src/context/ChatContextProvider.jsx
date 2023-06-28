import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getRequest, handleRequestApi, listAllUsers, listFriends} from "../api/friendApi.js";
import {LoginContext} from "./LoginContextProvider.jsx";
import {addMember, creatGroup, getMembers, leaveGroupApi, listAllGroups, listGroups} from "../api/groupApi.js";
import {toast} from "react-toastify";
import {friendHistoryMessage, groupHistoryMessage, newFriendMessages, newGroupMessages} from "../api/messageApi.js";
import STYLE from "../style.js";
import { TimeContext } from "./TimeContextProvider.jsx";

export const ChatContext = createContext(null);

function ChatContextProvider({children}) {
    // level: from 0 to 5
    const emptyGroup = {groupname: "", level: 0, members: []};
    const {isLogin, loginAccount, token} = useContext(LoginContext);
    const {formatDate, lastMsgTime, setLastMsgTime} = useContext(TimeContext);
    const {id: userId} = loginAccount;

    // data
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    // conversation
    // which conversation should show on the page
    // Its value equals to the id of the user/group
    /*
    Always set mode before conversation.
     */
    const [conversation, setConversation] = useState(-1);
    // 0: single user; 1. group
    const [mode, setMode] = useState(0);

    const loadAllUsers = async () => {
        const {code, data} = await listAllUsers(token);
        if (code === 1) setAllUsers(data);
    }

    const loadAllGroups = async () => {
        const {code, data} = await listAllGroups(token);
        if (code === 1) setAllGroups(data);
    }

    const loadFriends = async () => {
        const {code, data, msg} = await listFriends(token);
        if (code)
            setFriends(data);
        else
            toast(msg);
    }

    const loadGroups = async () => {
        const {code, data, msg} = await listGroups(token);
        if (code)
            setGroups(data);
        else
            toast(msg)
    }

    const loadMessages = async () => {
        if (conversation === -1) return;
        if (mode === 0) {
            // user
            const {code, data, msg} = await friendHistoryMessage(conversation, token);
            if (code) {
                setMessages(data['messageList']);
            } else {
                toast(msg);
            }
        }
        if (mode === 1) {
            // group
            const {code, data, msg} = await groupHistoryMessage(conversation, token);
            if (code) {
                setMessages(data['messageList']);
            } else {
                toast(msg);
            }
        }
    }

    const loadFriendNewMessages = async () => {
        console.log(lastMsgTime);
        const {code, data, msg} = await newFriendMessages(lastMsgTime, token);
        console.log(data);
        const newMsgTmp = newMessages;
        const existId = [];
        newMsgTmp.map((newMsg) => {
            if(newMsg.type === 0)
                existId.push(newMsg.id);
        })
        
        if (code) {
            data.map((friendMessage) => {
                    if (friendMessage.id1 !== loginAccount.id && friendMessage.id1 !== conversation && existId.includes(friendMessage.id1) === false) {
                        newMsgTmp.push(
                            {
                                id: friendMessage.id1,
                                messageText: friendMessage.messageText,
                                type: 0,
                                messageTime: friendMessage.messageTime,
                                name: findUserById(friendMessage.id1).name,
                            }
                        )
                        existId.push(friendMessage.id1);
                    }
                }
            )
            setNewMessages(newMsgTmp);
        } else {
            toast(msg);
        }
    }

    const loadGroupNewMessages = async () => {
        const {code, data, msg} = await newGroupMessages(lastMsgTime, token);
        console.log(data);
        const newMsgTmp = newMessages;
        const existId = [];
        newMsgTmp.map((newMsg => {
            if(newMsg.type === 1)
                existId.push(newMsg.id);
        }))
        if (code) {
            data.map((GroupMessage) => {
                    if (GroupMessage.id2 !== loginAccount.id && GroupMessage.id1 !== conversation && existId.includes(GroupMessage.id1) === false) {
                        newMsgTmp.push(
                            {
                                id: GroupMessage.id1,
                                messageText: GroupMessage.messageText,
                                type: 1,
                                messageTime: GroupMessage.messageTime,
                                name: findGroupById(GroupMessage.id1).name,
                            }
                        )
                        existId.push(GroupMessage.id1);
                    }
                }
            )
            setNewMessages(newMsgTmp);
            console.log(newMsgTmp);
        } else {
            toast(msg);
        }
    }

    const deleteNewMessages = (id, type) => {
        const nowMsgTmp = newMessages;
        const newMsgTmp = [];
        nowMsgTmp.map((newMsg) => {
            if (newMsg.id !== id || newMsg.type !== type)
                newMsgTmp.push(newMsg);
            else
                setLastMsgTime(formatDate(new Date(newMsg.messageTime)));
        })
        setNewMessages(newMsgTmp);
    }

    // 定时任务
    const fetchFriendRequest = async () => {
        if (!isLogin) return;
        const {code, data} = await getRequest(token);
        if (code) {
            setFriendRequests(data)
        }
    }

    useEffect(() => {
        if (isLogin) {
            loadFriends();
            loadGroups();
            loadAllUsers();
            loadAllGroups();
            changeSubmitGroup({members: [userId]});
            setMode(0);
            // by default is the first friend;
        }
    }, [isLogin])

    useEffect(() => {
        loadMessages()
    }, [conversation])

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLogin) {
                fetchFriendRequest();
                // loadMessages();
                loadFriendNewMessages();
                loadGroupNewMessages();
                console.log(newMessages);
                console.log("T");
            }
        }, 3000)
        return () => {
            clearInterval(interval);
        } 
    })

    // submit
    const [newGroup, setNewGroup] = useState(emptyGroup);

    const changeSubmitGroup = (dataObject) => {
        const newData = structuredClone(newGroup);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setNewGroup(newData);
    };

    const submitNewGroup = async () => {
        if (newGroup.groupname.trim() === "") {
            toast("群聊名称不能为空");
            return;
        }
        console.log(newGroup);
        const {groupname, level, members} = newGroup
        const {code, msg} = await creatGroup(groupname, level, members, token);
        toast(msg);
        if (code) {
            loadAllGroups()
            loadGroups()
        }
    }

    const handleRequest = async (friendId, action) => {
        const {code, msg} = await handleRequestApi(friendId, action, token);
        if (code) {
            toast("操作成功", {autoClose: 1000});
            fetchFriendRequest();
            loadFriends();
        } else {
            toast(msg);
        }
    }

    const joinGroup = async (groupId, members) => {
        const {code, msg} = await addMember(groupId, members, token);
        if (code) {
            toast(msg);
            loadGroups();
            loadAllGroups();
            return code
        }
    }

    const leaveGroup = async (groupId) => {
        const {code, msg} = await leaveGroupApi(groupId, token);
        if (code) {
            toast(msg);
            setMode(0);
            setConversation(-1);
            loadGroups();
            loadAllGroups();
        }
    }


    // utils
    const findUserById = (id) => {
        // console.log(id);
        // console.log(allUsers);
        const result = allUsers.find((user) => user.id === id);
        // console.log(result);
        return result;
    }

    const findGroupById = (id) => {
        // console.log(id);
        // console.log(allGroups);
        const result = allGroups.find((group) => group.id === id);
        // console.log(result);
        return result;
    }

    const getGroupSize = (id) => {
        const group = findGroupById(id);
        return STYLE.groupSize[group.level];
    }

    const findMembersById = async (id) => {
        // console.log(id);
        const {code, msg, data} = await getMembers(id, token);
        // console.log(data);
        if (code)
            return data;
        else
            toast(msg);
    }

    

    return <ChatContext.Provider
        value={{
            // data
            friends,
            groups,
            allUsers,
            allGroups,
            messages,
            newMessages,
            friendRequests,
            loadMessages,
            findUserById,
            findGroupById,
            findMembersById,
            handleRequest,
            deleteNewMessages,
            // submit
            newGroup,
            changeSubmitGroup,
            submitNewGroup,
            joinGroup,
            leaveGroup,
            getGroupSize,
            // conversation
            mode,
            setMode,
            conversation,
            setConversation,
            chats,
            setChats,

            
        }}>
        {children}
    </ChatContext.Provider>
}

ChatContextProvider.propTypes = {
    children: PropTypes.element,
}

export default ChatContextProvider;
