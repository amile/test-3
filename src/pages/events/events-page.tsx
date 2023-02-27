import React from 'react';
import {Col, Row} from 'antd';
import {EventCardContainer} from '../../components/event-card/event-card-container';
import {TopPanelContainer} from '../../components/top-panel/top-panel-container';
import CalendarLink from '../../components/calendar/calendar-link';

export type EventsPageProps = {
    keys: string[];
}

export const EventsPage: React.FC<EventsPageProps> = ({
    keys
}) => (
    <div className="container">
        <div className="mt-4 mb-3 text-align-right"><CalendarLink /></div>
        <div className="mb-3"><TopPanelContainer /></div>
        <Row>
            <Col span={24}>
                {keys.map(key => <div key={key} className="mb-3"><EventCardContainer id={key} /></div>)}
            </Col>
        </Row>
    </div>
);
