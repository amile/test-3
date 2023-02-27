import {ActionType, getType} from 'typesafe-actions';
import * as actions from '../actions/notifications-actions';
import {Notifications} from '../types/notifications';

export function notificationsReducer(state: Notifications = {}, action: ActionType<typeof actions>): Notifications {
    switch (action.type) {
        case getType(actions.setNotifications):
            return action.payload;
        
        case getType(actions.setNotification): {
            const notifications = state[action.payload.minute] || [];
            return {
                ...state,
                [action.payload.minute]: [...notifications, action.payload.message]
            };
        }

        case getType(actions.deleteNotification): {
            const notifications = state[action.payload.minute];
            const idx = notifications?.indexOf(action.payload.message) || -1;
            return idx === -1 ? state : {
                ...state,
                [action.payload.minute]: [...notifications.slice(0, idx), ...notifications.slice(idx + 1)]
            };
        }

        default:
            return state;
    }
}
