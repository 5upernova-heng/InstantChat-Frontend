import PropTypes from "prop-types";

const SelectButtonGroup = ({buttonsInfo, changeSelect}) => {
    const renderButtons = () => {
        return buttonsInfo.map((button, index) => {
            return (
                <button
                    key={index}
                    onClick={() => changeSelect(index)}
                    className={`btn ${button.style} ${
                        button.isActive ? "active" : ""
                    }`}
                    type="button"
                >
                    {button.label}
                </button>
            );
        });
    };
    return (
        <div className="btn-group" role="group">
            {renderButtons()}
        </div>
    );
};

SelectButtonGroup.propTypes = {
    buttonsInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeSelect: PropTypes.func.isRequired,
}

export default SelectButtonGroup;
