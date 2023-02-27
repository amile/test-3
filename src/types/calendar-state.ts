import {CalendarMode} from 'antd/es/calendar/generateCalendar'
import {Dayjs} from 'dayjs';

export type CalendarState = {
    mode: CalendarMode;
    selectedValue: Dayjs;
}
