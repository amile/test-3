import dayjs from 'dayjs';
import {FormNotification} from '../components/form/notification-field';
import {NotificationTimeType} from '../types/event-form';

export const minutesToMilliseconds = (minutes: number) => minutes * 60 * 1000;
export const hoursToMilliseconds = (hours: number) => minutesToMilliseconds(hours * 60);
export const daysToMilliseconds = (days: number) => hoursToMilliseconds(days * 24);

const notificationFormats = {
    [NotificationTimeType.Minute]: minutesToMilliseconds,
    [NotificationTimeType.Hour]: hoursToMilliseconds,
    [NotificationTimeType.Day]: daysToMilliseconds
}

export const formNotificationToMilliseconds = (value: FormNotification): number => notificationFormats[value.timeType](value.timeCount);

export const millisecondsToFormNotification = (value: number): Omit<FormNotification, 'enabled'> => {
    let timeType: NotificationTimeType;
    let timeCount: number;
    const minutes = value / (1000 * 60);
    const hours = minutes / 60;
    const days = hours / 24;
    if (minutes < 60) {
        timeType = NotificationTimeType.Minute;
        timeCount = minutes;
    } else if (hours < 60) {
        timeType = NotificationTimeType.Hour;
        timeCount = hours;
    } else {
        timeType = NotificationTimeType.Day;
        timeCount = days;
    }
    return {
        timeType,
        timeCount
    }
};
