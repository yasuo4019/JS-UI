import { useEffect, useMemo } from "react";
import { Container, Spinner } from "react-bootstrap";
import { connect } from 'react-redux';
import RequestStatus from "../../../services/enums/RequestState";
import * as actions from "../../../store/table/actions";
import * as selectors from "../../../store/table/selectors";
import EditableTable from "./table/EditableTable";
import PaginationBar from './table/pagination/PaginationBar';
import ViewTable from "./table/ViewTable";
import TableToolbar from "./toolbar/TableToolbar";

function TablePage(props) {
    const { goFirst, goLast, goToPage, goPrevious, goNext, fetchInitData, getDependencyOptions } = props.actions;
    const { onValueChange, onItemSelect, undoAllChanges, deleteRows, saveChanges } = props.actions;
    const { items, colNames, loadingState, pageIndex, pagesCount, isAnyLoading } = props.state;
    const { hasDependenciesLoaded } = props.state;
    const { valueHasChanged, selectedItemsCount, dependencies } = props.state;
    const { isEditable } = props;

    const isPaginationRequired = useMemo(() => pagesCount > 1, [pagesCount]);

    useEffect(() => {
        if (loadingState === RequestStatus.Initianlize) {
            fetchInitData();
            getDependencyOptions();
        }
    }, [items, loadingState, fetchInitData, getDependencyOptions]);

    if (loadingState === RequestStatus.Loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            {
                isEditable ?
                    <>
                        <TableToolbar
                            selectedCount={selectedItemsCount}
                            isEditedAny={valueHasChanged}
                            undoAllChanges={undoAllChanges}
                            onDeleteSelected={deleteRows}
                            onSave={saveChanges}
                            isAnyLoading={isAnyLoading}
                        />
                        <EditableTable
                            items={items}
                            colNames={colNames}
                            onChange={onValueChange}
                            onSelect={onItemSelect}
                            dependencies={dependencies}
                            getDependencyOptions={getDependencyOptions}
                            hasDependenciesLoaded={hasDependenciesLoaded}
                        />
                    </>
                    :
                    <ViewTable items={items} colNames={colNames} />
            }
            {
                isPaginationRequired &&
                <Container className="d-flex justify-content-center">
                    <PaginationBar
                        pageIndex={pageIndex}
                        pagesCount={pagesCount}
                        goFirst={goFirst}
                        goLast={goLast}
                        goToPage={goToPage}
                        goPrevious={goPrevious}
                        goNext={goNext}
                    />
                </Container>
            }
        </>
    );
}

function mapStateToProps(state) {
    const items = selectors.getItems(state);
    const colNames = selectors.getColumnNames(state);
    const loadingState = selectors.getLoadingState(state);
    const pageIndex = selectors.getPageIndex(state);
    const pagesCount = selectors.getPagesCount(state);
    const valueHasChanged = selectors.hasValueChanged(state);
    const selectedItemsCount = selectors.selectedRowsCount(state);
    const isAnyLoading = selectors.isAnyDataLoading(state);
    const dependencies = selectors.getDependencies(state);
    const hasDependenciesLoaded = selectors.hasDependenciesLoaded(state);

    return {
        state: {
            items, colNames, loadingState, pageIndex, pagesCount,
            valueHasChanged, selectedItemsCount, isAnyLoading,
            dependencies, hasDependenciesLoaded
        }
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        actions: {
            fetchInitData: () => dispatch(actions.fetchTableInfo(ownProps.defaultType)),
            goFirst: () => dispatch(actions.navigateFirstPage()),
            goPrevious: pageIndex => dispatch(actions.navigateToPreviousPage(pageIndex)),
            goToPage: pageIndex => dispatch(actions.navigateToPage(pageIndex)),
            goNext: pageIndex => dispatch(actions.navigateToNextPage(pageIndex)),
            goLast: pageIndex => dispatch(actions.navigateToPage(pageIndex)),
            deleteRows: () => dispatch(actions.deleteRows()),
            onValueChange: (row, col, value) => dispatch(actions.changeValue(row, col, value)),
            onItemSelect: input => dispatch(actions.selectItem(input.currentTarget)),
            undoAllChanges: () => dispatch(actions.undoAllChanges()),
            saveChanges: () => dispatch(actions.saveChanges()),
            getDependencyOptions: () => dispatch(actions.getDependencyOptions())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
