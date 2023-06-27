import "/src/styles/MessageInput.css"
import PropTypes from "prop-types";

function MessageInput({disabled}) {
    return (
        <div className="d-flex justify-content-center align-items-start gap-3"
             style={{
                 height: "10rem"
             }}
        >
            <div style={{width: "50%"}}>
                <textarea className="message-input" autoFocus={true}/>
            </div>
            <button disabled={disabled} className="btn btn-lg rounded-3 btn-primary shadow">发送</button>
        </div>
    )
}

MessageInput.propTypes = {
    disabled: PropTypes.bool,
}

export default MessageInput;
