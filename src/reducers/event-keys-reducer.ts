import {ActionType, getType} from 'typesafe-actions';
import * as actions from '../actions/event-keys-actions';

export type EventKeys = {[date: number]: string[]}

export function eventKeysReducer(state: {[date: number]: string[]} = {}, action: ActionType<typeof actions>): EventKeys {
    switch (action.type) {
        case getType(actions.setEventsKeys):
            return action.payload;
        
        case getType(actions.setEventKey): {
            const keys = state[action.payload.data] || [];
            return {
                ...state,
                [action.payload.data]: [...keys, action.payload.key]
            };
        }

        case getType(actions.deleteEventKey): {
            const keys = state[action.payload.data];
            const idx = keys.indexOf(action.payload.key);
            return {
                ...state,
                [action.payload.data]: [...keys.slice(0, idx), ...keys.slice(idx + 1)]
            };
        }

        default:
            return state;
    }
}
