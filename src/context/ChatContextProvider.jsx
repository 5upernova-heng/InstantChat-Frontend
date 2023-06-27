import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {listAllUsers, listFriends} from "../api/friendApi.js";
import {LoginContext} from "./LoginContextProvider.jsx";
import {listAllGroups, listGroups} from "../api/groupApi.js";
import {toast} from "react-toastify";

export const ChatContext = createContext(null);

function ChatContextProvider({children}) {
    // level: from 0 to 5
    const emptyGroup = {groupname: "", level: 0, members: []};

    const {isLogin, token} = useContext(LoginContext);

    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allGroups, setAllGroups] = useState([]);

    const [newGroup, setNewGroup] = useState(emptyGroup);

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

    useEffect(() => {
        if (isLogin) {
            loadFriends();
            loadGroups();
            loadAllUsers();
            loadAllGroups();
        }
    }, [isLogin])

    const changeSubmitGroup = (dataObject) => {
        const newData = structuredClone(newGroup);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setNewGroup(newData);
    };

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
        }}>
        {children}
    </ChatContext.Provider>
}

ChatContextProvider.propTypes = {
    children: PropTypes.element,
}

export default ChatContextProvider;
