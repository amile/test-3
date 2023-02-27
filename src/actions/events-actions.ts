import {createAction} from 'typesafe-actions';
import {EventKeys} from '../reducers/event-keys-reducer';
import {Event} from '../types/event';
import {EventForm} from '../types/event-form';

export const setEventToEvents = createAction('SET_EVENT_TO_EVENTS')<Event>();
export const deleteEventFromEvents = createAction('DELETE_EVENT_FROM_EVENTS')<string>();

export const setCurrentEventId = createAction('SET_CURRENT_EVENT_ID')<string | null>();
export const saveEventForm = createAction('SAVE_EVENT_FORM',
    (form: EventForm, onSuccess: (path: string) => void) => ({form, onSuccess}))();
export const removeEvent = createAction('REMOVE_EVENT')<string>();
