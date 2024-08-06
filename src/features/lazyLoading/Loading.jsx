import { App } from '../../App';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () =>
    <App>
        <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </App>;

export default Loading;
