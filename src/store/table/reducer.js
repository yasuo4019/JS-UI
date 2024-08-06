import _ from "lodash";
import Constants from '../../config/constants';

const initialState = {
    type: null,
    cols: [
        /**
         *  {
         *      title: 'string',
         *      key: 'string',
         *      dependency: 'string'
         *  }
         */
    ],
    items: [
        /**
         *  {
         *      id: "any unique id"
         *      selected: "boolean",
         *      hasChangedContent: "boolean",
         *      isLoading: "boolean",
         *      [error]: "string",
         *      contents:  {
         *          ...
         *          "key": { // key -> column key from cols array
         *              value: "any",
         *              defaultValue: "any",
         *              isChanged: "boolean",
         *              isLoading: "boolean",
         *              [error]: "string"
         *          }
         *      }
         *  }
         */
    ],
    page: 1,
    pagesCount: 1,
    state: 'Initianlize',
    dependencies: [
        /** {  key: "string", options: [any] }, */
    ],
    reason: '',
    idKeyName: null // the name of the field identifying the item id
};

export default function tableReducer(state = initialState, action) {
    switch (action.type) {
        case 'TABLE_SET_TYPE':
            {
                let { dependencies } = state;
                const { type } = action.payload;

                if (_.has(Constants, type)) {
                    const tableDetails = _.get(Constants, type);

                    if (tableDetails.dependencies) {
                        dependencies = tableDetails.dependencies.map(key => ({ key, options: [] }));
                    } else {
                        dependencies = initialState.dependencies;
                    }

                    return {
                        ...initialState,
                        type,
                        cols: tableDetails.cols,
                        idKeyName: tableDetails.key,
                        dependencies
                    };
                }

                return { ...initialState };
            }
        case 'TABLE_SET_DEPENDENCIES':
            {
                const { dependencies } = action.payload;
                let stateDependencies = _.cloneDeep(state.dependencies);

                stateDependencies = stateDependencies.map(dependency => ({
                    ...dependency,
                    options: dependencies[dependency.key]
                }));

                return { ...state, dependencies: stateDependencies };
            }
        case 'TABLE_INIT':
            {
                const { items, page, pageCount } = action.payload;

                const createTableItem = (item) => ({
                    id: String(item[state.idKeyName]),
                    selected: false,
                    isLoading: false,
                    hasChangedContent: false,
                    contents: state.cols.map(c => c.key)
                        .reduce((contentsAcc, col) =>
                            _.set(contentsAcc, col, {
                                value: _.get(item, col, ''),
                                defaultValue: _.get(item, col, ''),
                                isChanged: false,
                                isLoading: false,
                                error: null
                            }), {}
                        )
                });

                return {
                    ...state,
                    items: items.map(createTableItem),
                    page,
                    pageCount
                };
            }
        case 'TABLE_SET_STATE':
            {
                const { state: processState, reason } = action.payload;

                return { ...state, reason, state: processState };
            }
        case 'TABLE_CHANGE_VALUE':
            {
                // row => item.id / col => cols.key / value => 'new cell content'
                const { row, col, value } = action.payload;

                const replaceChangedContent = (item) => {
                    if (item.id === row) {
                        const defaultValue = _.get(item.contents, [col, 'defaultValue']);

                        _.set(item.contents, [col, 'error'], null);
                        _.set(item.contents, [col, 'isChanged'], defaultValue !== value);
                        _.set(item.contents, [col, 'value'], value);
                    }

                    return {
                        ...item,
                        hasChangedContent: _.values(item.contents).some(
                            content => content.isChanged
                        )
                    };
                }

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(replaceChangedContent)
                };
            }
        case 'TABLE_SELECT_ROW':
            {
                // row => item.id / checked => "boolean"
                const { row, checked } = action.payload;

                const setSelected = item => {
                    if (item.id === row) {
                        item.selected = checked;
                    }

                    return item;
                };

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(setSelected)
                };
            }
        case 'TABLE_UNDO_ALL_CHANGES':
            {
                const setDefaultState = item => {
                    const columnKeys = state.cols.map(c => c.key);

                    columnKeys.forEach(col => {
                        const defaultValue = _.get(item.contents, [col, 'defaultValue']);

                        _.set(item.contents, [col, 'error'], null);
                        _.set(item.contents, [col, 'isChanged'], false);
                        _.set(item.contents, [col, 'value'], defaultValue);
                    });

                    return {
                        ...item,
                        hasChangedContent: _.values(item.contents).some(
                            content => content.isChanged
                        )
                    };
                };

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(setDefaultState)
                }
            }
        case 'TABLE_DELETE_SELECTED':
            {
                const validationResults = action.payload;

                let items = _.cloneDeep(state.items);
                const selectedItems = items.filter(item => item.selected);

                for (let index = 0; index < validationResults.length; index++) {
                    const result = validationResults[index];
                    const deviantItem = selectedItems.find(item => String(item.id) === String(result.itemId));

                    if (deviantItem && result.columnName.toLowerCase() === state.idKeyName.toLowerCase()) {
                        deviantItem['error'] = result.message;
                    }
                }

                const notDeletedItems = selectedItems.filter(item => item.error);
                items = items.filter(item =>
                    !item.selected ||
                    notDeletedItems.some(dItem => dItem.id === item.id)
                );

                return { ...state, items };
            }
        case 'TABLE_SAVE_CHANGES':
            {
                const columnKeys = state.cols.map(c => c.key);

                const resetDefaultValue = item => {
                    if (item.hasChangedContent) {
                        columnKeys.forEach(col => {
                            const content = _.get(item.contents, col);

                            if (content.isChanged) {
                                _.set(item.contents, [col, 'defaultValue'], content.value);
                                content.isChanged = false;
                            }

                            if (content.error) {
                                content.error = null;
                            }
                        });
                    }

                    return {
                        ...item,
                        hasChangedContent: _.values(item.contents).some(
                            content => content.isChanged
                        )
                    };
                };

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(resetDefaultValue)
                };
            }
        case 'TABLE_SAVE_CHANGES_DISPLAY_ERROR':
            {
                const { results } = action.payload;
                const items = _.cloneDeep(state.items);
                const columnKeys = state.cols.map(c => c.key);

                for (let index = 0; index < results.length; index++) {
                    const result = results[index];
                    const deviantItem = items.find(item => String(item.id) === String(result.itemId));
                    const columnKey = columnKeys.find(ck => ck.toLowerCase() === result.columnName.toLowerCase());

                    if (deviantItem && columnKey) {
                        _.set(deviantItem.contents, [columnKey, 'error'], result.message);
                    }

                    if (deviantItem && result.columnName.toLowerCase() === state.idKeyName.toLowerCase()) {
                        columnKeys
                            .filter(key => deviantItem.contents[key]?.isChanged)
                            .forEach(key => _.set(deviantItem.contents, [key, 'error'], result.message));
                    }
                }

                return { ...state, items };
            }
        case 'TABLE_TOGGLE_SELECTED_ROWS_TO_LOADING':
            {
                const { loading } = action.payload;

                const setLoading = item => {
                    if (item.selected) {
                        item.isLoading = loading;
                    }

                    return item;
                };

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(setLoading)
                };
            }
        case 'TABLE_TOGGLE_CHANGED_CELLS_TO_LOADING':
            {
                const { loading } = action.payload;
                const columnKeys = state.cols.map(c => c.key);

                const setLoading = item => {
                    if (item.hasChangedContent) {
                        columnKeys.forEach(col => {
                            if (_.get(item.contents, [col, 'isChanged'])) {
                                _.set(item.contents, [col, 'isLoading'], loading);
                            }
                        });
                    } else {
                        columnKeys.forEach(col => {
                            if (_.get(item.contents, [col, 'isLoading'])) {
                                _.set(item.contents, [col, 'isLoading'], loading);
                            }
                        });
                    }

                    return {
                        ...item,
                        hasChangedContent: _.values(item.contents).some(
                            content => content.isChanged
                        )
                    };
                };

                return {
                    ...state,
                    items: _.cloneDeep(state.items).map(setLoading)
                };
            }
        default:
            return { ...state };
    }
}
