import GlobalNotification from '../Components/notification/Global';

function Content({ children }) {
    return (
        <div className="position-relative py-3">
            {children}
            <GlobalNotification />
        </div>
    );
}

export default Content;
