import { Form, Stack, Button } from "react-bootstrap";

function FileInput(props) {
    const { isLocked } = props;
    const { setFile, loadFileToServer, resetSelection } = props;

    return (
        <Stack direction="horizontal" gap={3} sm="10" >
            <Form.Control
                id="id_fileInput"
                type="file"
                placeholder="Select your file here..."
                disabled={isLocked}
                onChange={setFile}
            />
            <Button
                type="submit"
                variant="secondary"
                disabled={isLocked}
                onClick={loadFileToServer}>Submit</Button>
            <div className="vr" />
            <Button
                type="reset"
                variant="outline-danger"
                disabled={isLocked}
                onClick={resetSelection}>Reset</Button>
        </Stack>
    );
}

export default FileInput;
