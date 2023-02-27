import dayjs from 'dayjs';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {setCalendarMode, setCalendarSelectedValue} from '../../actions/calendar-actions';
import {RootState} from '../../types/root-state';
import {CalendarPage, EventsCounts} from './calendar-page';

const eventsCountsSelector = createSelector([
    (s: RootState) => s.eventKeysByDate
], (keysByDate): EventsCounts => {
    const counts = Object.keys(keysByDate).reduce((prev, curr) => {
        const date = dayjs(parseInt(curr));
        const yearCounts = prev[date.year()] || {};
        const monthCounts = yearCounts[date.month()] || 0;
        return {
            ...prev,
            [date.year()]: {
                ...yearCounts,
                [date.month()]: monthCounts + keysByDate[curr as any].length
            }
        };
    }, {} as EventsCounts);
    return counts;
});

export const CalendarPageContainer = connect<
    Pick<CalendarPage, 'mode' | 'value' | 'eventsCounts'>,
    Pick<CalendarPage, 'changeMode' | 'changeValue'>,
    {},
    RootState>(
        (state) => ({
            mode: state.calendar.mode,
            value: state.calendar.selectedValue,
            eventsCounts: eventsCountsSelector(state)
        }),
        (dispatch) => ({
            changeMode(mode) {
                dispatch(setCalendarMode(mode));
            },
            changeValue(val) {
                dispatch(setCalendarSelectedValue(val));
            }
        })
    )(CalendarPage);
