import {connect} from 'react-redux';
import {removeEvent, setCurrentEventId} from '../../actions/events-actions';
import {RootState} from '../../types/root-state';
import EventCard, {EventCardProps} from './event-card';

export const EventCardContainer = connect<
    Pick<EventCardProps, 'event'>,
    Pick<EventCardProps, 'edit' | 'remove'>,
    Pick<EventCardProps, 'id'>,
    RootState>(
        (state, ownProps) => ({
            event: state.events[ownProps.id]
        }),
        (dispatch, ownProps) => ({
            edit() {
                dispatch(setCurrentEventId(ownProps.id));
            },
            remove() {
                if (!confirm('Вы действительно хотите удалить мероприятие?')) {
                    return;
                }
                dispatch(removeEvent(ownProps.id));
            }
        })
    )(EventCard);
