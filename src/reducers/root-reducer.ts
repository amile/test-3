import {combineReducers} from 'redux';
import {setCurrentEventId} from '../actions/events-actions';
import {RootState} from '../types/root-state';
import {calendarReducer} from './calendar-reducer';
import createReducer from './create-reducer';
import {eventKeysReducer} from './event-keys-reducer';
import {eventsReducer} from './events-reducer';
import {notificationsReducer} from './notifications-reducer';

export const rootReducer = combineReducers<RootState>({
    events: eventsReducer,
    calendar: calendarReducer,
    currentEventId: createReducer<string | null>(setCurrentEventId, null),
    eventKeysByDate: eventKeysReducer,
    notifications: notificationsReducer
});
