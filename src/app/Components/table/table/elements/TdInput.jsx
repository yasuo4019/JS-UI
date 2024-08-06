import { useMemo, useEffect, useCallback, useRef, useState } from "react";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function TdInput({ error, row, col, value = '', isChanged, onChange }) {
    const dataCell = useRef(null);
    const [showError, setShowError] = useState(false);

    const className = useMemo(() => {
        let className = 'Table-Value';

        if (isChanged) {
            className += ' Table-Value-Edited table-warning';
        }

        return className;
    }, [isChanged]);

    const handleInput = useCallback((event) => {
        setShowError(false);
        onChange(row, col, event.currentTarget.textContent);
    }, [onChange, row, col]);

    /**
     *  If you're passing value from state,
     *  you can mutate it each change for not losing cursor position.
     */
    useEffect(() => {
        if (dataCell.current) {
            dataCell.current.textContent = value;
        }
    }, [value]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    return (
        <>
            <td
                id={`input-${row}-${col}`}
                className={className}
                onInput={handleInput}
                ref={dataCell}
                suppressContentEditableWarning={true}
                contentEditable
            ></td>
            <Overlay target={dataCell.current} show={showError} placement="bottom">
                {(props) => (
                    <Tooltip id={`tooltip-${row}-${col}`} {...props}>
                        {error}
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
};

export default TdInput;
