import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";
import LoginForm from '../form/Login';

function LoginModal({ onClose }) {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } };

    const login = useCallback(() => {
        auth.signin(() => {
            navigate(from);
        });
    }, [auth, from, navigate]);

    const handleClose = useCallback(() => {
        setShow(false);
        onClose?.();
    },
        [setShow, onClose]
    );

    const handleLogin = useCallback(() => {
        setShow(false);
        login();
    },
        [setShow, login]
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Provide your credentials</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <LoginForm />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    variant="primary"
                    onClick={handleLogin}
                >
                    Log in
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;