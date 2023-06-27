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
        <div className="avatar d-flex justify-content-center align-items-center shadow" style={{
            backgroundColor: `${color || hashCodeColor(name)}`,
            height: STYLE.avatarSize[size || "md"],
            width: STYLE.avatarSize[size || "md"]
        }}>
            <p className="fw-bold mb-0"
               style={{
                   color: textColor || "white",
                   fontSize: size ? STYLE.avatarFontSize[size] : STYLE.avatarFontSize["md"]
               }}
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
    shadow: PropTypes.bool,
}

export default Avatar;
