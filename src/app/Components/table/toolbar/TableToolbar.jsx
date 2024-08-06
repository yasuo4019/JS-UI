import { Button, Badge } from "react-bootstrap";
import "./TableToolbar.css";

/**
 * Delete selected items.
 * Highlight changed lines on cell change.
 * Undo all changes.
 * Save items.
 */
export default function TableToolbar({
    selectedCount = 0,
    isEditedAny = false,
    isAnyLoading = false,
    undoAllChanges,
    onDeleteSelected,
    onSave
}) {
    return (
        <div className="sticky-top Table-Toolbar">
            <div className="float-start">
                <Button variant="danger" disabled={!selectedCount || isAnyLoading} onClick={onDeleteSelected}>
                    Delete <Badge bg="secondary" pill>{selectedCount}</Badge>
                    <span className="visually-hidden">delete selected items</span>
                </Button>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="primary" disabled={!isEditedAny || isAnyLoading} onClick={undoAllChanges}>Undo</Button>
                <Button variant="success" disabled={!isEditedAny || isAnyLoading} onClick={onSave}>Save Changes</Button>
            </div>
        </div>
    );
};
