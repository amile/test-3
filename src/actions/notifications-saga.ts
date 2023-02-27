import {delay, put, select} from 'redux-saga/effects';
import dayjs, {Dayjs} from 'dayjs';
import {Event} from '../types/event';
import {RootState} from '../types/root-state';
import {showInfoNotification} from '../utils/notifications';
import {Events} from '../types/events';
import {Notifications} from '../types/notifications';
import {setNotifications} from './notifications-actions';

const getMsToNextMinute = (now: Dayjs) => 60000 - now.second() * 1000;

export function* setNotificationsSaga() {
    const events: Events = yield select((s: RootState) => s.events);
    const notifications: Notifications = Object.values(events).reduce((prev, curr) => {
        const notificationMinute = curr.from - curr.notificationDuration;
        const ids = prev[notificationMinute];
        return {
            ...prev,
            [notificationMinute]: ids ? [...ids, curr.id] : [curr.id]
        }
    }, {} as Notifications);
    yield put(setNotifications(notifications));
}

export function* showNotificationsSaga() {
    while (true) {
        const now = dayjs();
        const events: Events = yield select((s: RootState) => s.events);
        const idx: string[] = yield select((s: RootState) => s.notifications[now.toMinuteMs()] || []);
        idx.forEach(id => {
            const event: Event = events[id];
            showInfoNotification(`${event.title}\nc ${dayjs(event.from).timeFormat()} по ${dayjs(event.to).timeFormat()}`);
        });
        yield delay(getMsToNextMinute(now));
    }
}
