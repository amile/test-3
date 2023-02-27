import {call, fork, put, select, takeEvery} from 'redux-saga/effects';
import {ActionType, getType} from 'typesafe-actions';
import dayjs from 'dayjs';
import {v4 as uuid} from 'uuid';
import {ROUTES} from '../router/routes';
import {Event} from '../types/event';
import {formNotificationToMilliseconds} from '../utils/date-time';
import {RootState} from '../types/root-state';
import {showSuccessNotification} from '../utils/notifications';
import {deleteNotification, setNotification} from './notifications-actions';
import {setNotificationsSaga, showNotificationsSaga} from './notifications-saga';
import {deleteEventKey, setEventKey} from './event-keys-actions';
import {setEventKeysSaga} from './event-keys-saga';
import {
    deleteEventFromEvents,
    removeEvent,
    saveEventForm,
    setCurrentEventId,
    setEventToEvents
} from './events-actions';

function* saveEventFormSaga(action: ActionType<typeof saveEventForm>) {
    const {form, onSuccess} = action.payload;
    const currentEvent: Event = yield select((s: RootState) => s.currentEventId ? s.events[s.currentEventId] : null);
    const notificationDuration = formNotificationToMilliseconds(form.notification);
    const from = form.from.toMinuteMs();
    const id = currentEvent?.id || uuid();
    const event: Event = {
        id ,
        from,
        notificationDuration,
        to: form.to.toMinuteMs(),
        title: form.title,
        notificationEnabled: form.notification.enabled
    }
    yield put(setEventToEvents(event));
    if (currentEvent) {
        yield put(deleteNotification(currentEvent.from - currentEvent.notificationDuration, id));
        yield put(deleteEventKey({data: dayjs(currentEvent.from).toDayMs(), key: id}));
    }
    yield put(setEventKey({data: form.from.toDayMs(), key: id}));
    yield put(setNotification(from - notificationDuration, id));
    yield put(setCurrentEventId(null));
    showSuccessNotification('Мероприятие успешно сохранено!');
    onSuccess(ROUTES.calendar.path);
}

function* removeEventSaga(action: ActionType<typeof removeEvent>) {
    const id = action.payload;
    const event: Event = yield select((s: RootState) => s.events[action.payload]);
    yield put(deleteEventFromEvents(action.payload));
    yield put(deleteEventKey({data: dayjs(event.from).toDayMs(), key: id}));
    yield put(deleteNotification(event.from - event.notificationDuration, id));
    showSuccessNotification('Мероприятие успешно удалено!');
}

export function* rootSaga() {
    yield call(setEventKeysSaga);
    yield call(setNotificationsSaga);
    yield fork(showNotificationsSaga);

    yield takeEvery(getType(removeEvent), removeEventSaga);
    yield takeEvery(getType(saveEventForm), saveEventFormSaga);
}