import Input from "./Input.jsx";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import MemberSelect from "./MemberSelect.jsx";

function CreateGroupForm() {
    const {newGroup, changeSubmitGroup} = useContext(ChatContext);

    const {members} = newGroup;

    const changeName = (name) => {
        changeSubmitGroup({groupname: name});
    }
    const changeLevel = (level) => {
        changeSubmitGroup({level});
    }

    const changeMembers = (id) => {
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
            <hr/>
            <p className="fw-bold">选择成员</p>
            <MemberSelect members={members} toggleMember={changeMembers}/>
        </div>
    )
}

export default CreateGroupForm;
