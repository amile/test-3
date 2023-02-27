import React from 'react';
import {Col, Divider, Row} from 'antd';
import CalendarLink from '../../components/calendar/calendar-link';
import {EventFormContainer} from '../../components/event-form/event-form-container';

export const EventPage: React.FC = () => (
    <div className="container">
        <div className="mt-4 mb-2 text-align-right"><CalendarLink /></div>
        <Row>
            <Col xs={24} lg={16}>
                <Divider />
                <EventFormContainer />
            </Col>
        </Row>
    </div>
);
