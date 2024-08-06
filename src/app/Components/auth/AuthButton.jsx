import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth.jsx";
import LoginModal from "./LoginModal.jsx";

function AuthButton() {
	const auth = useAuth();
	const navigate = useNavigate();
	const [showModal, setShow] = useState(false);

	const signout = useCallback(() => {
		setShow(false);
		auth.signout(() => navigate("/"));
	}, [setShow, navigate, auth]);

	if (auth.user) {
		return (
			<Button variant="outline-primary" onClick={signout}>
				Sign out
			</Button>
		);
	}

	return (
		<>
			<Button
				variant="outline-primary"
				onClick={() => setShow(true)}
			>
				Log in
			</Button>
			{showModal && <LoginModal onClose={() => setShow(false)} />}
		</>
	);
}

export default AuthButton;