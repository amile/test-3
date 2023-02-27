import {put, select} from 'redux-saga/effects';
import dayjs from 'dayjs';
import {RootState} from '../types/root-state';
import {Events} from '../types/events';
import {EventKeys} from '../reducers/event-keys-reducer';
import {setEventsKeys} from './event-keys-actions';

export function* setEventKeysSaga() {
    const events: Events = yield select((s: RootState) => s.events);
    const eventKeys: EventKeys = Object.values(events).reduce((prev, curr) => {
        
        const date: number = dayjs(curr.from).toDayMs();
        const keys = prev[date];
        return {
            ...prev,
            [date]: keys ? [...keys, curr.id] : [curr.id]
        }
    }, {} as EventKeys);
    yield put(setEventsKeys(eventKeys));
}
