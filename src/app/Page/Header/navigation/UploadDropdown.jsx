import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

function UploadDropdown({ className }) {
    let navigate = useNavigate();

    return (
        <DropdownButton id="upload-dropdown" className={className} title="Upload">
            <Dropdown.Item onClick={() => navigate("/file/submit")}>Files</Dropdown.Item>
        </DropdownButton >
    );
}

export default UploadDropdown;
