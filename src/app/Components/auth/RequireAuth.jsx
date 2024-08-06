import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function RequireAuth({ element }) {
    const auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
}

export default RequireAuth;