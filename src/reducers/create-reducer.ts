import {ActionType, getType} from 'typesafe-actions';

export default function createReducer<T>(boundAction: any, defaultState: T) {
    return (state: T = defaultState, action: ActionType<typeof boundAction>): T => {
        if (action.type === getType(boundAction)) {
            return action.payload;
        }
        return state;
    };
}
