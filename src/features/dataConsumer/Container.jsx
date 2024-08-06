import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FileInput from "./components/FileInput"
import FileDescription from "./components/FileDescription"
import * as selectors from './selectors';
import * as actions from './actions';

function Container(props) {
    const { isFileSelected, isSelectionLocked, fileInfo } = props;
    const { setFileDetails, loadFileToServer, resetSelection } = props;

    return (
        <div className="d-grid gap-4">
            <Form>
                <FileInput
                    setFile={setFileDetails}
                    loadFileToServer={loadFileToServer}
                    resetSelection={resetSelection}
                    isLocked={isSelectionLocked}
                />
            </Form>
            {
                isSelectionLocked && <Button
                    variant="danger"
                    size="lg"
                    onClick={resetSelection}>Cancel loading....</Button>
            }
            {isFileSelected && <FileDescription file={fileInfo} />}
        </div>
    );
}

function mapStateToProps(state) {
    const isSelectionLocked = selectors.isSelectionLocked(state);
    const isFileSelected = selectors.isFileSelected(state);
    const fileInfo = selectors.getFileList(state);

    return { isFileSelected, isSelectionLocked, fileInfo };
}

const mapDispatchToProps = (dispatch) => ({
    setFileDetails: (event) => dispatch(actions.setFile(event.currentTarget.files)),
    loadFileToServer: () => dispatch(actions.loadFileToServer()),
    resetSelection: () => dispatch(actions.resetSelection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
