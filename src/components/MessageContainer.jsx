import Message from "./Message.jsx";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import {LoginContext} from "../context/LoginContextProvider.jsx";

function MessageContainer() {
    const {loginAccount} = useContext(LoginContext)
    const {allUsers, messages} = useContext(ChatContext);

    const renderMessages = () => {
        return messages.map((message, index) => {
            const {id1, messageText} = message
            const role = id1 === loginAccount.id ? "user" : "other"
            const user = allUsers.findUserById(id1);
            return <Message key={index} role={role} message={messageText} user={user}/>
        })
    }
    return (
        <div className="d-flex flex-column gap-3 pt-3">
            {renderMessages()}
        </div>
    );
}

export default MessageContainer;
