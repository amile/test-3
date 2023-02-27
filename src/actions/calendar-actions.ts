import {createAction} from 'typesafe-actions';
import {CalendarMode} from 'antd/es/calendar/generateCalendar';
import {Dayjs} from 'dayjs';

export const setCalendarMode = createAction('SET_CALENDAR_MODE')<CalendarMode>();
export const setCalendarSelectedValue = createAction('SET_CALENDAR_SELECTED_VALUE')<Dayjs>();
