import {createAction} from 'typesafe-actions';
import {Notifications} from '../types/notifications';

export const setNotifications = createAction('SET_NOTIFICATIONS')<Notifications>();
export const deleteNotification = createAction('DELETE_NOTIFICATION', (minute: number, message: string) => ({minute, message}))();
export const setNotification = createAction('SET_NOTIFICATION', (minute: number, message: string) => ({minute, message}))();
