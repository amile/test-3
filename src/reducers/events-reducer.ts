import {ActionType, getType} from 'typesafe-actions';
import * as actions from '../actions/events-actions';
import {Events} from '../types/events';
import {getAndWriteNextState, getDefaultStateFromLS} from '../utils/events-state';

const LS_KEY = 'events';

export function eventsReducer(state: Events = getDefaultStateFromLS(LS_KEY), action: ActionType<typeof actions>): Events {
    switch (action.type) {
        case getType(actions.setEventToEvents):
            return getAndWriteNextState(LS_KEY, {
                ...state,
                [action.payload.id]: action.payload
            });

        case getType(actions.deleteEventFromEvents):
            const {[action.payload]:_, ...rest} = state
            return getAndWriteNextState(LS_KEY, rest);

        default:
            return state;
    }
}
