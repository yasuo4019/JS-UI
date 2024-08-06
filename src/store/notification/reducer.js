import _ from 'lodash';

const defaultPosition = "top-center";

const initialState = {
    notifications: [
        /**
         *  {
         *      id: "string-unique-id"
         *      title: "string"
         *      message: "string"
         *  }
         */
    ],
    position: defaultPosition,
    timeout: 10000 // ms = 10 s
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'NOTIFICATION_ADD':
            {
                const { message, title } = action.payload;
                const notifications = _.cloneDeep(state.notifications);
                const notification = {
                    id: _.uniqueId(),
                    title: title ?? 'Application error',
                    message: message ?? 'Please contact your administrator.'
                };

                notifications.push(notification);

                return { ...state, notifications };
            }
        case 'NOTIFICATION_REMOVE':
            {
                const { id } = action.payload;
                const notifications = state.notifications.filter(n => n.id !== id);

                return { ...state, notifications };
            }
        default:
            return { ...state };
    }
};
