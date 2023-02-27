import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import {CalendarOutlined} from '@ant-design/icons';
import {Event} from '../../types/event';
import {ROUTES} from '../../router/routes';

export type CalendarLinkProps = {
    date: number; 
    events: Event[];
}

const CalendarLink: React.FC = () => (
    <Button type="link" icon={<CalendarOutlined />}>
        <Link className="ml-2" to={ROUTES.calendar.path}>Календарь</Link>
    </Button>
);

export default CalendarLink;
