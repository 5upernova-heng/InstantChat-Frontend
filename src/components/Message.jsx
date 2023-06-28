import PropTypes from "prop-types";
import STYLE from "../style.js";
import Avatar from "./Avatar.jsx";
import Time from "./Time.jsx";

function Message({message, time, user, role}) {
    return (
        <div className={`d-flex align-items-start justify-content-start ${STYLE.messageAlignStyle[role]} mx-3 gap-3`}>
            <Avatar name={user.name}/>
            <div
                className={`d-flex flex-column flex-grow-1 ${role === "user" ? "align-items-end" : "align-items-start"} `}>
                <div className={`d-flex align-items-center ${STYLE.messageAlignStyle[role]} gap-3`}>
                    <h5 className="fw-bold">{user.name}</h5>
                    <Time timeStr={time}/>
                </div>
                <div
                    className={`rounded-3 shadow ${STYLE.roleBackgroundStyle[role]}`}
                    style={{
                        maxWidth: "50%",
                        padding: "0.7rem"
                    }}>
                    <p className={`mb-0 ${STYLE.textColorStyle[role]}`}
                       style={{
                           whiteSpace: "pre-line",
                           wordBreak: "break-all",
                           fontSize: "1.5rem"
                       }}>{message}</p>
                </div>
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    time: PropTypes.string.isRequired,
    // user, others
    role: PropTypes.string.isRequired,
}

export default Message;
