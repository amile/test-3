import React from 'react';
import {Button, DatePicker, Form, Input} from 'antd';
import {useNavigate} from 'react-router-dom';
import {EventForm as EventFormType} from '../../types/event-form';
import {DATE_TIME_FORMAT} from '../../utils/dayjs-extensions';
import {NotificationField} from '../form/notification-field';

export type EventFormProps = {
    data: EventFormType;
    save: (form: EventFormType, onSuccess: (path: string) => void) => void;
}

const formRules = {
    title: [{required: true, message: 'Необходимо указать название.'}],
    dateTime: [{required: true, message: 'Необходимо выбрать время.'}]
}

export const EventForm: React.FC<EventFormProps> = ({
    data,
    save
}) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onSave = (values: EventFormType) => save(values, (path) => navigate(path));

    return (
        <Form
            name="event-form"
            labelCol={{md: { span: 6 }}}
            wrapperCol={{md: { span: 18 }}}
            onFinish={onSave}
            form={form}
            initialValues={data}
        >
            <Form.Item
                label="Название"
                name="title"
                rules={formRules.title}
            >
                <Input
                    type="text"
                    placeholder="Новое мероприятие"
                />
            </Form.Item>
            <Form.Item
                label="C"
                name="from" 
                rules={formRules.dateTime}
            >
                <DatePicker
                    showTime
                    format={DATE_TIME_FORMAT}
                />
            </Form.Item>
            <Form.Item
                label="По"
                name="to" 
                rules={formRules.dateTime}
            >
                <DatePicker
                    showTime
                    format={DATE_TIME_FORMAT}
                />
            </Form.Item>
            <Form.Item
                label="Напоминать за"
                name="notification"
            >
                <NotificationField />
            </Form.Item>
            <Form.Item wrapperCol={{
                xs: {offset: 0, span: 24},
                md: {offset: 6, span: 18}
            }}>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};
