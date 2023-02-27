import {notification} from 'antd';

const NOTIFICATION_DURATION = 3;

export const showSuccessNotification = (message: string) => notification.success({
    message,
    duration: NOTIFICATION_DURATION,
});

export const showInfoNotification = (message: string) => notification.info({
    message,
    duration: NOTIFICATION_DURATION,
});