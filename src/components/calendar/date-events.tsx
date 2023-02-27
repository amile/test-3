import React from 'react';
import {Badge} from 'antd';
import {Event} from '../../types/event';
import '../../styles/date-events.less';

export type DateEventsProps = {
    date: number; 
    events: Event[];
}

const DateEvents: React.FC<DateEventsProps> = ({
    events
}) => (
    <ul className="date-events">
        {events.map(event => (
            <li key={event.id}>
                <Badge status="success" size='small' text={event.title} />
            </li>
        ))}
    </ul>
);

export default DateEvents;
