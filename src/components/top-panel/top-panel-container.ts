import {connect} from 'react-redux';
import {setCurrentEventId} from '../../actions/events-actions';
import {RootState} from '../../types/root-state';
import TopPanel, {TopPanelProps} from './top-panel';

export const TopPanelContainer = connect<
    Pick<TopPanelProps, 'selectedDate'>,
    Pick<TopPanelProps, 'add'>,
    {},
    RootState>(
        (state) => ({
            selectedDate: state.calendar.selectedValue
        }),
        (dispatch) => ({
            add() {
                dispatch(setCurrentEventId(null));
            }
        })
    )(TopPanel);
