import {CalendarState} from './calendar-state';
import {Event} from './event'
import {Notifications} from './notifications';

export type RootState = {
    calendar: CalendarState;
    events: {[key: string]: Event};
    currentEventId: string | null;
    eventKeysByDate: {[date: number]: string[]};
    notifications: Notifications;
}
