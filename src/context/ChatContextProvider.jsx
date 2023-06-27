import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {listAllUsers, listFriends} from "../api/friendApi.js";
import {LoginContext} from "./LoginContextProvider.jsx";
import {creatGroup, listAllGroups, listGroups} from "../api/groupApi.js";
import {toast} from "react-toastify";
import {friendHistoryMessage, groupHistoryMessage} from "../api/messageApi.js";

export const ChatContext = createContext(null);

function ChatContextProvider({children}) {
    // level: from 0 to 5
    const emptyGroup = {groupname: "", level: 0, members: []};

    const {isLogin, loginAccount, token} = useContext(LoginContext);
    const {id: userId} = loginAccount;

    // data
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [messages, setMessages] = useState([]);

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
        if (mode === 0) {
            // user
            const {code, data, msg} = friendHistoryMessage(conversation, token);
            if (code) {
                setMessages(data['messageList']);
            } else {
                toast(msg);
            }
        }
        if (mode === 1) {
            // group
            const {code, data, msg} = groupHistoryMessage(conversation, token);
            if (code) {
                setMessages(data['messageList']);
            } else {
                toast(msg);
            }
        }
    }

    useEffect(() => {
        if (isLogin) {
            loadFriends();
            loadGroups();
            loadAllUsers();
            loadAllGroups();
            changeSubmitGroup({members: [userId]});
            // by default is the first friend;
            setConversation(allUsers[0].id);
            setMode(0);
            loadMessages();
        }
    }, [isLogin])

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

    // conversation
    // which conversation should show on the page
    // Its value equals to the id of the user/group
    const [conversation, setConversation] = useState(0);
    // 0: single user; 1. group
    const [mode, setMode] = useState(0);

    return <ChatContext.Provider
        value={{
            // data
            friends,
            groups,
            allUsers,
            allGroups,
            // submit
            newGroup,
            changeSubmitGroup,
            submitNewGroup,
        }}>
        {children}
    </ChatContext.Provider>
}

ChatContextProvider.propTypes = {
    children: PropTypes.element,
}

export default ChatContextProvider;
