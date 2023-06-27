import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {listFriends} from "../api/friendApi.js";
import {LoginContext} from "./LoginContextProvider.jsx";
import {listGroups} from "../api/groupApi.js";
import {toast} from "react-toastify";

export const ChatContext = createContext(null);

function ChatContextProvider({children}) {
    const {isLogin, token} = useContext(LoginContext);

    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);

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
        }
    }, [isLogin, loadFriends, loadGroups, token])

    return <ChatContext.Provider
        value={{
            friends,
            groups,
        }}>
        {children}
    </ChatContext.Provider>
}

ChatContextProvider.propTypes = {
    children: PropTypes.element,
}

export default ChatContextProvider;
