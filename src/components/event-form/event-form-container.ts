import dayjs from 'dayjs';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {saveEventForm} from '../../actions/events-actions';
import {initialFormNotification} from '../form/notification-field';
import {EventForm as EventFormType} from '../../types/event-form';
import {RootState} from '../../types/root-state';
import {millisecondsToFormNotification} from '../../utils/date-time';
import {EventForm, EventFormProps} from './event-form';

const dataSelector = createSelector([
    (s: RootState) => s.events,
    (s: RootState) => s.currentEventId,
    (s: RootState) => s.calendar.selectedValue,
], (events, currentId, date): EventFormType => {
    if (currentId === null) {
        const from = date || dayjs();
        return {
            from,
            to: from.add(1, 'hour'),
            title: '',
            notification: initialFormNotification
        }
    }
    const event = events[currentId];
    return {
        title: event.title,
        from: dayjs(event.from),
        to: dayjs(event.to),
        notification: {
            enabled: event.notificationEnabled,
            ...millisecondsToFormNotification(event.notificationDuration)
        }
    }
});

export const EventFormContainer = connect<
    Pick<EventFormProps, 'data'>,
    Pick<EventFormProps, 'save'>,
    {},
    RootState>(
        (state) => ({
            data: dataSelector(state)
        }),
        (dispatch) => ({
            save(form, onSuccess) {
                dispatch(saveEventForm(form, onSuccess));
            }
        })
    )(EventForm);
