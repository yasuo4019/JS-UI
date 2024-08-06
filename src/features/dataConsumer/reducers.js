import DeliveryState from '../../services/enums/DeliveryState'

const initialState = {
    files: [], // file: {name, size, type, state}
    isSelected: false,
    isSelectionLocked: false
};

export default function fileConsumer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FILE_DETAILS':
            return {
                ...state,
                files: [
                    ...state.files,
                    ...action.payload.fileList
                ],
                isSelected: true
            };
        case 'LOAD_FILE_TO_SERVER':
            return {
                ...state,
                files: state.files.map(file => ({
                    ...file,
                    state: DeliveryState.Loading
                })),
                isSelectionLocked: true
            };
        case 'RESET_SELECTION':
            return cleanSelection();
        default:
            return {...state };
    }
}

function cleanSelection() {
    return initialState;
}