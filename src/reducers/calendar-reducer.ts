import dayjs from 'dayjs';
import {ActionType, getType} from 'typesafe-actions';
import * as actions from '../actions/calendar-actions';
import {CalendarState} from '../types/calendar-state';

export function calendarReducer(state: CalendarState = {
    mode: 'month',
    selectedValue: dayjs()
}, action: ActionType<typeof actions>): CalendarState {
    switch (action.type) {
        case getType(actions.setCalendarMode):
            return {
                ...state,
                mode: action.payload
            };

        case getType(actions.setCalendarSelectedValue):
            return {
                ...state,
                selectedValue: action.payload
            };

        default:
            return state;
    }
}
