import {createAction} from 'typesafe-actions';
import {EventKeys} from '../reducers/event-keys-reducer';

export const setEventsKeys = createAction('SET_EVENTS_KEYS')<EventKeys>();
export const deleteEventKey = createAction('DELETE_EVENT_KEY')<{data: number, key: string}>();
export const setEventKey = createAction('SET_EVENT_KEY')<{data: number, key: string}>();
