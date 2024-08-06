export const add = (title, message) => ({
    type: 'NOTIFICATION_ADD',
    payload: {
        title, message
    }
});

export const remove = id => dispatch => {
    dispatch({
        type: 'NOTIFICATION_REMOVE',
        payload: {
            id
        }
    });
};
