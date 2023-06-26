import {useContext, useEffect, useState} from "react";
import UserCard from "./UserCard.jsx";
import List from "./List.jsx";
import {listAllUsers} from "../api/friendApi.js";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {listAllGroups} from "../api/groupApi.js";

function AddConversation() {
    const [tab, setTab] = useState(0);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const {token, isLogin} = useContext(LoginContext);
    const tabs = ["添加好友", "添加群聊"];

    useEffect(() => {
        if (isLogin) {
            loadUsers();
            loadGroups();
        }
    }, [isLogin])

    const loadUsers = async () => {
        const {code, data} = await listAllUsers(token);
        if (code === 1) setUsers(data);
    }

    const loadGroups = async () => {
        const {code, data} = await listAllGroups(token);
        if (code === 1) setGroups(data);
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
            <button className="btn btn-sm btn-primary">
                发送请求
            </button>
        </div>)

    const renderGroup = (group, index) => (
        <div key={index} className="px-3 d-flex align-items-center">
            <UserCard name={group.name}/>
            <button className="btn btn-sm btn-primary">
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
            <div className="border">
                <List renderMethod={renderMethod[tab]} data={data[tab]} title={titles[tab]}/>
            </div>
        </div>
    )
}

export default AddConversation;
