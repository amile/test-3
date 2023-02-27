import {Dayjs} from 'dayjs';

export type EventForm = {
    title: string;
    from: Dayjs;
    to: Dayjs;
    notification: {
        enabled: boolean;
        timeCount: number;
        timeType: NotificationTimeType;
    }
}

export enum NotificationTimeType {
    'Minute',
    'Hour',
    'Day'
}
