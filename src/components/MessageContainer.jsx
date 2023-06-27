import Message from "./Message.jsx";
import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import {LoginContext} from "../context/LoginContextProvider.jsx";

function MessageContainer() {
    const {loginAccount} = useContext(LoginContext)
    const {findUserById, mode, messages} = useContext(ChatContext);

    const [parsedMessage, setParsedMessage] = useState([]);

    useEffect(() => {
        const newMessage = () => {
            if (mode === 0)
                return messages.map((message) => {
                    const {id1, messageText, messageTime} = message;
                    return {
                        id: id1,
                        messageText,
                        messageTime
                    }
                })
            if (mode === 1)
                return messages.map((message) => {
                    const {id2, messageText, messageTime} = message;
                    return {
                        id: id2,
                        messageText,
                        messageTime
                    }
                })
        }
        setParsedMessage(newMessage());
    }, [messages])

    const renderMessages = () => {
        return parsedMessage.map((message, index) => {
            const {id, messageText, messageTime} = message;
            const role = id === loginAccount.id ? "user" : "other"
            const user = findUserById(id);
            return <Message key={index} role={role} time={messageTime} message={messageText} user={user}/>
        })
    }
    return (
        <div className="d-flex flex-column gap-3 pt-3">
            {renderMessages()}
        </div>
    );
}

export default MessageContainer;
