import { connect } from 'react-redux';
import { useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import * as selectors from "../../../store/notification/selectors";
import * as actions from "../../../store/notification/actions";
import "./Global.css";

const GlobalNotification = ({ notifications = [], position, onClose }) => (
    <ToastContainer className="Notification-Global p-3" position={position}>
        {
            notifications.map(details =>
                <ToastNotification key={details.id} details={details} onClose={onClose} />
            )
        }
    </ToastContainer>
);

const ToastNotification = ({ details, onClose }) => {
    const [show, setShow] = useState(true);
    const onCloseCallback = useCallback(
        () => {
            setShow(false);
            onClose?.(details.id);
        },
        [setShow, details, onClose]
    );

    return (
        <Toast
            onClose={onCloseCallback}
            show={show}
            delay={details.timeout}
            autohide
        >
            <Toast.Header>
                <strong className="me-auto">{details.title}</strong>
            </Toast.Header>
            <Toast.Body>{details.message}</Toast.Body>
        </Toast>
    );
};

function mapStateToProps(state) {
    const notifications = selectors.getNotifications(state);
    const position = selectors.getPosition(state);

    return { notifications, position };
};

function mapDispatchToProps(dispatch) {
    const removeNotification = (id) => dispatch(actions.remove(id));

    return { onClose: removeNotification };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotification);
