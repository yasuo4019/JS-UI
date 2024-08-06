import LoginModal from "./LoginModal";
import { useLocation } from "react-router-dom";

function LoginPage() {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };

	return (
		<div className="pt-4">
			<p>You must log in to view the page at {from.pathname}</p>
			<LoginModal />
		</div>
	);
}

export default LoginPage;