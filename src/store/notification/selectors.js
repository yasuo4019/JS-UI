export const getPosition = (state) => state.notificationManager.position;
export const getNotifications = (state) => state.notificationManager.notifications.map(
    notification => ({
        ...notification,
        timeout: state.notificationManager.timeout
    })
);
