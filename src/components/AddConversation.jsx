import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import UserCard from "./UserCard.jsx";
import List from "./List.jsx";
import {friendRequest} from "../api/friendApi.js";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import {toast} from "react-toastify";
import CreateGroupForm from "./CreateGroupForm.jsx";

function AddConversation({tab, setTab}) {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    const {token, isLogin, loginAccount} = useContext(LoginContext);
    const {friends, groups: addedGroups, joinGroup, allUsers, allGroups} = useContext(ChatContext);

    const tabs = ["添加好友", "添加群聊", "创建群聊"];

    useEffect(() => {
        if (isLogin) {
            loadUsers(allUsers);
        }
    }, [isLogin, allUsers])

    useEffect(() => {
        if (isLogin) {
            loadGroups(allGroups);
        }
    }, [isLogin, allGroups])

    const loadUsers = () => {
        // delete self
        const filteredUsers = allUsers.filter((user) => friends.findIndex(
            (friend) => user.id === friend.id || user.id === loginAccount.id) === -1)
        setUsers(filteredUsers);
    }

    const loadGroups = () => {
        const filterGroups = allGroups.filter((group) => addedGroups.findIndex(
            (addedGroup) => addedGroup.id === group.id) === -1)
        setGroups(filterGroups);
    }

    const addFriend = async (id) => {
        const {code} = await friendRequest(id, token);
        if (code) toast("请求发送成功");
    }

    const renderTabs = () => {
        return (
            <div className="d-flex px-2 gap-3 align-items-end">
                {
                    tabs.map(
                        (t, index) => {
                            const selected = tab === index;
                            return (
                                <button key={index}
                                        className={`btn border-bottom-0 rounded-bottom-0 rounded-top p-2 ${selected && "border"}`}
                                        onClick={() => setTab(index)}>
                                    <p className={`mb-0 ${selected && "text-primary"}`}>
                                        {t}
                                    </p>
                                </button>);
                        })
                }
            </div>

        )
    }
    const renderUser = (user, index) => (
        <div key={index} className="px-3 d-flex align-items-center">
            <UserCard name={user.name}/>
            <button className="btn btn-sm btn-primary"
                    onClick={() => {
                        addFriend(user.id);
                    }}
            >
                发送请求
            </button>
        </div>)

    const renderGroup = (group, index) => (
        <div key={index} className="px-3 d-flex align-items-center">
            <UserCard name={group.name}/>
            <button className="btn btn-sm btn-primary"
                    onClick={() => {
                        joinGroup(group.id, [loginAccount.id]);
                    }}>
                加入群聊
            </button>
        </div>
    )


    const renderMethod = [renderUser, renderGroup];
    const data = [users, groups];
    const titles = ["好友", "群聊"]

    return (
        <div>
            {renderTabs()}
            <div className={tab < 2 ? "border" : "border-top"}>
                {tab < 2 ? <List renderMethod={renderMethod[tab]} data={data[tab]} title={titles[tab]}/>
                    : <CreateGroupForm/>}
            </div>
        </div>
    )
}

AddConversation.propTypes = {
    tab: PropTypes.number.isRequired,
    setTab: PropTypes.func.isRequired,
}

export default AddConversation;
