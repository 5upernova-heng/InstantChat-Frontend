import "/src/styles/MessageInput.css"
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {sendGroupMessage, sendMessage} from "../api/messageApi.js";
import {toast} from "react-toastify";

function MessageInput({disabled}) {
    const {token} = useContext(LoginContext);
    const {mode, conversation, loadMessages} = useContext(ChatContext);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (mode === 0) {
            // user
            const {code, msg} = await sendMessage(conversation, message, token)
            if (code) {
                loadMessages()
                setMessage("");
            } else
                toast(msg);
            return;
        }
        if (mode === 1) {
            const {code, msg} = await sendGroupMessage(conversation, message, token)
            if (code) {
                loadMessages()
                setMessage("");
            } else
                toast(msg);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start gap-3"
             style={{
                 height: "10rem"
             }}
        >
            <div style={{width: "50%"}}>
                <textarea className="message-input" autoFocus={true}
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                />
            </div>
            <button disabled={disabled} className="btn btn-lg rounded-3 btn-primary shadow"
                    onClick={() => {
                        handleSubmit()
                    }}
            >发送
            </button>
        </div>
    )
}

MessageInput.propTypes = {
    disabled: PropTypes.bool,
}

export default MessageInput;
