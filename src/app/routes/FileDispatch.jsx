import DataConsumer from '../../features/dataConsumer/Container.jsx';
import Container from "react-bootstrap/Container";

const FileDispatch = () => (
    <Container>
        <div id="id_dataSubmission" className="d-grid gap-4">
            <h2>You can select a data file to submit here</h2>
            <div id="id_dataSubmissionForm">
                <DataConsumer />
            </div>
        </div>
    </Container>
);

export default FileDispatch;
