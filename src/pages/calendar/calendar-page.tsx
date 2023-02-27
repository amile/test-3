import React from 'react';
import {Calendar, Typography} from 'antd';
import type {Dayjs} from 'dayjs';
import type {CalendarMode} from 'antd/es/calendar/generateCalendar';
import {generatePath, useNavigate} from 'react-router-dom';
import {ROUTES} from '../../router/routes';
import {TopPanelContainer} from '../../components/top-panel/top-panel-container';
import {DateEventsContainer} from '../../components/calendar/date-events-container';

export type EventsCounts = {[year: number]: {[month: number]: number}}

export type CalendarPage = {
    mode: CalendarMode;
    value: Dayjs;
    eventsCounts: EventsCounts;
    changeMode: (mode: CalendarMode) => void;
    changeValue: (val: Dayjs) => void;
}

const dateCellRender = (date: Dayjs) => <DateEventsContainer date={date.toDayMs()} />;
const monthCellRender = (eventsCounts: EventsCounts) => (date: Dayjs) => (
    <Typography.Text type="secondary">
        Запланировано мероприятий: {eventsCounts[date.year()]?.[date.month()] || 0}
    </Typography.Text>
);

export const CalendarPage: React.FC<CalendarPage> = ({
    mode,
    value,
    eventsCounts,
    changeMode,
    changeValue
}) => {
    const navigate = useNavigate();

    const onPanelChange = (val: Dayjs, newMode: CalendarMode) => {
        if (mode !== newMode) {
            changeMode(newMode);
        } else {
            changeValue(val);
        }
    };

    const onSelect = (val: Dayjs) => {
        if ((mode === 'month' && value.month() !== val.month()) || value.year() !== val.year()) {
            return;
        }
        if (mode === 'year') {
            changeMode('month');
        } else {
            navigate(generatePath(ROUTES.events.path, {
                month: (val.month() + 1).toString(),
                day: val.date().toString()
            }));
        }
        changeValue(val);
    };
    
    return (
        <div className="container">
            <div className="mt-2 mb-3"><TopPanelContainer /></div>
            <Calendar
                mode={mode}
                value={value || undefined}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender(eventsCounts)}
            />
        </div>
    );
};
