import React from "react";
import './Modal.css';

const Modal = ({handleClose, show, children}) => {
    const showHide = show ? {display: 'block'} : {display: 'none'};
    return (
        <div className="modal" style={showHide} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleClose} className="btn btn-primary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal;

