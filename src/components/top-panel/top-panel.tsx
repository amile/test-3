import React from 'react';
import {Dayjs} from 'dayjs';
import {Alert, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../router/routes';

export type TopPanelProps = {
    selectedDate: Dayjs;
    add: () => void;
}

const TopPanel: React.FC<TopPanelProps> = ({
    selectedDate,
    add
}) => {
    const navigate = useNavigate();
    const onAdd = () => {
        add();
        navigate(ROUTES.createEvent.path);
    };

    return (
        <Alert
            message={selectedDate.dateFormat()}
            action={
                <Button
                    type="primary"
                    onClick={onAdd}
                >
                    + Новое мероприятие
                </Button>
            }
        />
    );
};

export default TopPanel;
