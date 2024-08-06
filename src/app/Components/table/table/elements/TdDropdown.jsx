import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function TdDropdown({ value, row, col, options = [], isChanged, error, onSelect }) {
    const dataCell = useRef(null);
    const [showError, setShowError] = useState(false);

    const handleSelect = useCallback((event) => {
        setShowError(false);
        onSelect(row, col, event.currentTarget.value);
    }, [onSelect, row, col]);

    const className = useMemo(() => {
        let className = 'Table-Value';

        if (isChanged) {
            className += ' Table-Value-Edited table-warning';
        }

        return className;
    }, [isChanged]);

    useEffect(() => {
        setShowError(!!error);
    }, [error]);

    return (
        <>
            <td
                id={`dropdown-${value}`}
                className={className}
                ref={dataCell}
            >
                <select name="choice" defaultValue={value} onChange={handleSelect}>
                    {
                        options.map(option => (
                            <option
                                key={`${option.id}-${option.value}`}
                                value={option.value}
                            >
                                {option.value}
                            </option>
                        ))
                    }
                </select>
            </td>
            <Overlay target={dataCell.current} show={showError} placement="bottom">
                {(props) => (
                    <Tooltip id={`tooltip-${row}-${col}`} {...props}>
                        {error}
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default TdDropdown;
