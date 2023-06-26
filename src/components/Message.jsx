import PropTypes from "prop-types";
import STYLE from "../style.js";

function Message({message, role}) {
    return (
        <div className={`d-flex align-items-center ${STYLE.roleAlignStyle[role]}`}>
            <div className={`mx-4 rounded-3 shadow ${STYLE.roleBackgroundStyle[role]}`}
                 style={{
                     maxWidth: "50%",
                     padding: "0.7rem"
                 }}>
                <p className={`mb-0 ${STYLE.textColorStyle[role]}`}
                   style={{
                       whiteSpace: "pre-line",
                       fontSize: "1.5rem"
                   }}>{message}</p>
            </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
}

export default Message;
