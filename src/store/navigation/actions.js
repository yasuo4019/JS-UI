export const setActiveTable = (type) => dispatch => {
    dispatch({ type: 'TABLE_SET_TYPE', payload: { type } });
};