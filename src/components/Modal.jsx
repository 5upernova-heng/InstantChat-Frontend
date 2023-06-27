import PropTypes from "prop-types";

const Modal = ({id, size, headerLabel, bodyComponent, footerComponent}) => {
    return (
        <div className="modal fade" tabIndex="-1" id={id} aria-hidden="true">
            <div className={`modal-dialog modal-${size}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{headerLabel}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{bodyComponent}</div>
                    <div className="modal-footer">{footerComponent}</div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    size: PropTypes.string,
    headerLabel: PropTypes.string,
    bodyComponent: PropTypes.element,
    footerComponent: PropTypes.element,
};

export default Modal;
