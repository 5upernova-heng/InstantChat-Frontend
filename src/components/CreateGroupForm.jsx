import Input from "./Input.jsx";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import MemberSelect from "./MemberSelect.jsx";
import SelectButtonGroup from "./SelectButtonGroup.jsx";
import STYLE from "../style.js";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {toast} from "react-toastify";

function CreateGroupForm() {
    const {loginAccount} = useContext(LoginContext);
    const {newGroup, changeSubmitGroup} = useContext(ChatContext);

    const {id: userId} = loginAccount;
    const {members, level} = newGroup;

    const changeName = (name) => {
        changeSubmitGroup({groupname: name});
    }
    const changeLevel = (level) => {
        changeSubmitGroup({level});
    }

    const changeMembers = (id) => {
        if (id === userId) {
            toast("创建者必须在群里哦~");
            return;
        }
        if (members.includes(id)) {
            const index = members.indexOf(id);
            members.splice(index, 1);
        } else {
            members.push(id);
        }
        changeSubmitGroup({members});
    }

    return (
        <div>
            <div className="py-2"/>
            <Input onChange={(event) => {
                changeName(event.target.value);
            }} name={"groupName"} label={"群聊名称"}/>
            <p className="pt-2 fw-bold">选择成员</p>
            <MemberSelect members={members} toggleMember={changeMembers}/>
            <p className="pt-2 fw-bold">选择群聊等级</p>
            <div className="d-flex align-items-center justify-content-center">
                <SelectButtonGroup changeSelect={changeLevel} buttonsInfo={
                    STYLE.parseButtonInfo(STYLE.groupLevelButtonStyle, level)
                }/>
            </div>
        </div>
    )
}

export default CreateGroupForm;
