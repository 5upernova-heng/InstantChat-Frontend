import Avatar from "./Avatar.jsx";
import PropTypes from "prop-types";

function UserCard({name}) {
    return (
        <>
            <Avatar name={name} size="sm"/>
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <h4 className="mb-0">{name}</h4>
            </div>
        </>
    )
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
}

export default UserCard;
