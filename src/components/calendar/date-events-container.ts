import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {Event} from '../../types/event';
import {RootState} from '../../types/root-state';
import DateEvents, {DateEventsProps} from './date-events';

const eventsSelector = createSelector([
    (_, date: number) => date,
    (s: RootState) => s.eventKeysByDate,
    (s: RootState) => s.events
], (date, keys, events): Event[] => (keys[date]?.map(id => events[id]) || []).sort((a, b) => a.from - b.from));

export const DateEventsContainer = connect<
    Pick<DateEventsProps, 'events'>,
    {},
    Pick<DateEventsProps, 'date'>,
    RootState>(
        (state, ownProps) => ({
            events: eventsSelector(state, ownProps.date)
        })
    )(DateEvents);
