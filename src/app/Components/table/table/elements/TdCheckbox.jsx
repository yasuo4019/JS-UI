import { useEffect, useCallback, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

const TdCheckbox = ({ item, onSelect, error }) => {
    const dataCell = useRef(null);
    const [showError, setShowError] = useState(false);

    const updateControl = useCallback((event) => {
        setShowError(false);
        onSelect(event);
    }, [onSelect]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    return (
        <>
            <td ref={dataCell}>
                {
                    item.isLoading
                        ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <input
                            type="checkbox"
                            value={item.id}
                            checked={item.selected}
                            onChange={updateControl}
                        />
                }
            </td>
            <Overlay target={dataCell.current} show={showError} placement="bottom">
                {(props) => (
                    <Tooltip id={`checkbox-tooltip-${item.id}`} {...props}>
                        {error}
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default TdCheckbox;
