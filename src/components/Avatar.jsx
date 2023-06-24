import PropTypes from "prop-types";
import STYLE from "/src/style.js";
import "/src/styles/Avatar.css"

function Avatar({name, size, color, textColor}) {

    const hashCodeColor = (name) => {
        let hash = 0;
        for (let i = 0, len = name.length; i < len; i++) {
            hash = (hash * 31) + name.charCodeAt(i);
        }
        const index = hash % STYLE.backgroundColors.length;
        return STYLE.backgroundColors[index];
    }
    return (
        <div className="avatar d-flex rounded-4 justify-content-center align-items-center" style={{
            backgroundColor: `${color || hashCodeColor(name)}`,
            height: STYLE.avatarSize[size || "md"],
            width: STYLE.avatarSize[size || "md"]
        }}>
            <p className="fw-bold fs-1 mb-0"
               style={{color: textColor || "white"}}
            >
                {name[0]}
            </p>
        </div>
    )
}

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
}

export default Avatar;
