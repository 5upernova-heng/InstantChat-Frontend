import PropTypes from "prop-types";

const Input = ({name, icon, label, value, type, onChange, error}) => {
    return (
        <>
            <label className="fw-bold  mb-1" htmlFor={name}>
                {label}
            </label>
            <div className="input-group flex-nowrap">
                {icon && <span className="input-group-text">{icon}</span>}
                <input
                    id={name}
                    value={value}
                    name={name}
                    type={type}
                    onChange={onChange}
                    className="form-control"
                />
            </div>
            {error && (
                <div
                    style={{overflowWrap: "break-word", maxWidth: "400px"}}
                    className="alert alert-danger p-2"
                >
                    {error}
                </div>
            )}
        </>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.element,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
};

export default Input;
