import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {RootState} from '../../types/root-state';
import {EventsPage, EventsPageProps} from './events-page';

const keysSelector = createSelector([
    (s: RootState) => s.calendar.selectedValue,
    (s: RootState) => s.eventKeysByDate,
    (s: RootState) => s.events
], (calendarDate, keysByDate, events): string[] => {
    const date = calendarDate?.toDayMs();
    const keys = keysByDate[date] || [];
    return keys.map(k => events[k]).sort((a, b) => a.from - b.from).map(i => i.id);
});

export const EventsPageContainer = connect<EventsPageProps, {}, {}, RootState>(
    (state) => ({
        keys: keysSelector(state)
    })
)(EventsPage);
