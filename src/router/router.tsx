import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {NotFound} from '../pages/errors/not-found';
import {CalendarPageContainer} from '../pages/calendar/calendar-page-container';
import {EventPage} from '../pages/events/event-page';
import {EventsPageContainer} from '../pages/events/events-page-container';
import {ROUTES} from './routes';

export const RoutedContent: React.FC = () => (
    <Routes>
        <Route path="/" element={<Navigate replace to={ROUTES.calendar.path} />} />
        <Route path={ROUTES.calendar.path} element={<CalendarPageContainer />} />
        <Route path={ROUTES.createEvent.path} element={<EventPage />} />
        <Route path={ROUTES.editEvent.path} element={<EventPage />} />
        <Route path={ROUTES.events.path} element={<EventsPageContainer />} />

        {/*    404    */}
        <Route path="*" element={<NotFound />} />
    </Routes>
);