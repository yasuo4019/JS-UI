import DeliveryState from '../../services/enums/DeliveryState'

export const setFile = (files) => {
    const fileList = [];

    for (let index = 0; index < files.length; index++) {
        const { name, size, type } = files[index];

        fileList.push({ name, size, type, state: DeliveryState.Selected });
    }

    return {
        type: 'SET_FILE_DETAILS',
        payload: {
            fileList
        }
    };
};

export const loadFileToServer = () => {
    return { type: 'LOAD_FILE_TO_SERVER' };
};

export const resetSelection = () => {
    return { type: 'RESET_SELECTION' };
};