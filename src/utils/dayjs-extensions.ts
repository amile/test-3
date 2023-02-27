import dayjs from 'dayjs';

declare module 'dayjs' {
    export interface Dayjs {
        toDayMs: () => number;
        toMinuteMs: () => number;
        timeFormat: () => string;
        dateFormat: () => string;
        dateTimeFormat: () => string;
    }
}

export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';
const DATE_FORMAT = 'DD.MM.YYYY';
const TIME_FORMAT = 'HH:mm';

dayjs.prototype.toDayMs = function(): number {
    return (<dayjs.Dayjs> this).startOf('date').valueOf();
};

dayjs.prototype.toMinuteMs = function(): number {
    return (<dayjs.Dayjs> this).startOf('minute').valueOf();
};

dayjs.prototype.timeFormat = function(): string {
    return (<dayjs.Dayjs> this).format(TIME_FORMAT);
};

dayjs.prototype.dateFormat = function(): string {
    return (<dayjs.Dayjs> this).format(DATE_FORMAT);
};

dayjs.prototype.dateTimeFormat = function(): string {
    return (<dayjs.Dayjs> this).format(DATE_TIME_FORMAT);
};
