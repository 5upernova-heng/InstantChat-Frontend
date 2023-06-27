import PropTypes from "prop-types";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContextProvider.jsx";

function MemberSelect({members, toggleMember}) {
    const {allUsers: users} = useContext(ChatContext);
    const renderUsers = (users) => {
        return users.map((user, index) => {
            return (
                <span
                    style={{
                        cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => {
                        toggleMember(user.id);
                    }}
                    className={`${
                        members.includes(user.id)
                            ? "bg-primary"
                            : "bg-secondary"
                    } d-inline-block mx-1 my-1 border px-2 py-1 rounded rounded-pill opacity-75`}
                >
                    <p className="mb-0 fs-6 text-white">{user.name}</p>
                </span>
            );
        });
    };
    return (
        <div className="d-flex justify-content-center">
            <div>
                <div
                    className="p-1 rounded border"
                    style={{
                        whiteSpace: "no-wrap",
                        wordBreak: "keep-all",
                        overflow: "auto",
                    }}
                >
                    {renderUsers(users)}
                </div>
            </div>
        </div>
    );
}

MemberSelect.propTypes = {
    members: PropTypes.array.isRequired,
    toggleMember: PropTypes.func.isRequired,
}

export default MemberSelect
