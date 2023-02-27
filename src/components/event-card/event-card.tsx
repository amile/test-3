import React from 'react';
import dayjs from 'dayjs';
import {Button, Card} from 'antd';
import {generatePath, useNavigate} from 'react-router-dom';
import {Event} from '../../types/event';
import {ROUTES} from '../../router/routes';

export type EventCardProps = {
    id: string;
    event: Event;
    edit: () => void;
    remove: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    event,
    edit,
    remove
}) => {
    const navigate = useNavigate()
    const onEdit = () => {
        edit();
        navigate(generatePath(ROUTES.editEvent.path, {id: event.id}));
    }

    return (
        <Card>
            <Card.Meta
                title={event.title}
                description={<p>{dayjs(event.from).timeFormat()} - {dayjs(event.to).timeFormat()}</p>}
            />
            <div className="mt-2 text-align-right">
                <Button
                    ghost
                    size="small"
                    type="primary"
                    className="mr-3"
                    onClick={onEdit}
                >
                    Редактировать
                </Button>
                <Button
                    size="small"
                    className="mr-3"
                    onClick={remove}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    );
};

export default EventCard;
