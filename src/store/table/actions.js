import _ from 'lodash';
import * as notification from '../notification/actions';
import RequestState from '../../services/enums/RequestState';
import GeneService from '../../services/geneService';
import Constants from '../../config/constants';

export const fetchTableInfo = defaultType => async (dispatch, getState) => {
    const { table } = getState();
    const tableType = table.type || defaultType;

    // set the type if the table type is not defined (open page from a bookmark)
    if (!table.type) {
        dispatch({ type: 'TABLE_SET_TYPE', payload: { type: tableType } });
    }

    let tableState = RequestState.Loading;
    let reason = `requesting root:${tableType} setup info`;

    dispatch({
        type: 'TABLE_SET_STATE',
        payload: { state: tableState, reason }
    });

    try {
        const request = {
            tableType,
            root: _.get(Constants, tableType).url.root,
        };
        const response = await GeneService.getSetupInfo(request);

        dispatch({
            type: 'TABLE_INIT',
            payload: {
                items: response.data,
                page: response.pagination.pageIndex,
                pageCount: response.pagination.pagesCount
            }
        });

        tableState = RequestState.Done;
        reason = 'response retrived';
    } catch (error) {
        tableState = RequestState.Failed;
        reason = `error on requesting data - root:${tableType}`;

        const title = `${tableType} - ${tableState}`;
        const message = `${error} Reason: ${reason}`;

        dispatch(notification.add(title, message));
        console.error(error);
    } finally {
        dispatch({
            type: 'TABLE_SET_STATE',
            payload: { state: tableState, reason }
        });
    }
};

export const getDependencyOptions = () => async (dispatch, getState) => {
    const { table } = getState();

    // do nothing if the table doesn't contain dependencies
    if(!table.dependencies.length) {
        return;
    }

    try {
        const request = { root: _.get(Constants, table.type).url.root };
        const response = await GeneService.getDependencies(request);

        dispatch({
            type: 'TABLE_SET_DEPENDENCIES',
            payload: { dependencies: response }
        });
    } catch (error) {
        const reason = `error on requesting dependencies - root:${table.type}`;

        const title = `${table.type}`;
        const message = `${error}\nReason: ${reason}`;

        dispatch(notification.add(title, message));
        console.error(error);
    }
};

export const navigateToPage = pageIndex => async (dispatch, getState) => {
    const { table } = getState();

    let tableState = RequestState.Loading;
    let reason = `requesting page:${pageIndex} to root:${table.type}`;

    dispatch({
        type: 'TABLE_SET_STATE',
        payload: { state: tableState, reason }
    });

    try {
        const request = {
            tableType: table.type,
            root: _.get(Constants, table.type).url.root,
            pageId: pageIndex > 0 ? pageIndex : 1,
        };
        const response = await GeneService.getItems(request);

        dispatch({
            type: 'TABLE_INIT',
            payload: {
                items: response.data,
                page: response.pagination.pageIndex,
                pageCount: response.pagination.pagesCount
            }
        });

        tableState = RequestState.Done;
        reason = 'response retrived';

    } catch (error) {
        tableState = RequestState.Failed;
        reason = `error on requesting data - page:${pageIndex} - root:${table.type}`;

        const title = `${table.type} - ${tableState}`;
        const message = `${error}\nReason: ${reason}`;

        dispatch(notification.add(title, message));
        console.error(error);
    } finally {
        dispatch({
            type: 'TABLE_SET_STATE',
            payload: { state: tableState, reason }
        });
    }
};

export const navigateFirstPage = () => {
    const pageIndex = 1;

    return navigateToPage(pageIndex);
};

export const navigateToPreviousPage = pageNumber => {
    const pageIndex = _.subtract(pageNumber, 1);

    return navigateToPage(pageIndex);
};

export const navigateToNextPage = pageNumber => {
    const pageIndex = _.add(pageNumber, 1);

    return navigateToPage(pageIndex);
};

export const deleteRows = () => async (dispatch, getState) => {
    const { table } = getState();
    const ids = table.items.filter(item => item.selected).map(item => item.id);

    dispatch({ type: 'TABLE_TOGGLE_SELECTED_ROWS_TO_LOADING', payload: { loading: true } });

    try {
        const request = {
            tableType: table.type,
            root: _.get(Constants, table.type).url.root,
            body: { ids }
        };
        const response = await GeneService.delete(request);

        dispatch({
            type: 'TABLE_DELETE_SELECTED',
            payload: response.entriesUpdated.entryValidationResults
        });
    } catch (error) {
        const title = 'Server error!';
        const reason = `error on delete action - ${table.type}`;
        const message = `${error}\nReason: ${reason}`;

        dispatch(notification.add(title, message));
        console.error(error);
    } finally {
        dispatch({ type: 'TABLE_TOGGLE_SELECTED_ROWS_TO_LOADING', payload: { loading: false } });
    }
};

export const changeValue = (row, col, value) => dispatch => dispatch({
    type: 'TABLE_CHANGE_VALUE',
    payload: {
        row, col, value
    }
});

export const selectItem = input => dispatch => dispatch({
    type: 'TABLE_SELECT_ROW',
    payload: {
        row: input.value,
        checked: input.checked
    }
});

export const undoAllChanges = () => async dispatch => {
    dispatch({
        type: 'TABLE_TOGGLE_CHANGED_CELLS_TO_LOADING',
        payload: {
            loading: true
        }
    });

    await dispatch({ type: 'TABLE_UNDO_ALL_CHANGES' });

    dispatch({
        type: 'TABLE_TOGGLE_CHANGED_CELLS_TO_LOADING',
        payload: {
            loading: false
        }
    });
};

export const saveChanges = () => async (dispatch, getState) => {
    const { table } = getState();
    const itemsWithChangedContent = table.items.filter(item => item.hasChangedContent)
        .map(item => {
            const jsonItem = {};
            jsonItem[table.idKeyName] = item.id;

            table.cols.reduce(
                (accumulatorItem, column) => {
                    const value = item.contents[column.key].value;

                    if (column.dependency) {
                        const dependency = table.dependencies.find(dep => dep.key === column.dependency);
                        const option = dependency.options.find(opt => opt.value === value);

                        return _.set(accumulatorItem, column.key, option);
                    }

                    return _.set(accumulatorItem, column.key, value);
                },
                jsonItem
            );

            return jsonItem;
        });

    dispatch({
        type: 'TABLE_TOGGLE_CHANGED_CELLS_TO_LOADING',
        payload: {
            loading: true
        }
    });

    try {
        const request = {
            tableType: table.type,
            root: _.get(Constants, table.type).url.root,
            body: {
                items: itemsWithChangedContent
            }
        };
        const response = await GeneService.saveChanges(request);

        const { entryValidationResults } = response.entriesUpdated;
        const allValid = entryValidationResults.every(result => result.isValid);

        if (allValid) { // if all changes are valid, reset default value to the new state
            dispatch({
                type: 'TABLE_SAVE_CHANGES',
                payload: response
            });
        } else {
            dispatch({
                type: 'TABLE_SAVE_CHANGES_DISPLAY_ERROR',
                payload: {
                    results: entryValidationResults
                }
            });
        }
    } catch (error) {
        const reason = `error on save cahnges - table:${table.type}`;
        const message = `${error}\nReason: ${reason}`;
        dispatch(notification.add(table.type, message));

        console.error(error);
    } finally {
        dispatch({
            type: 'TABLE_TOGGLE_CHANGED_CELLS_TO_LOADING',
            payload: {
                loading: false
            }
        });
    }
};
