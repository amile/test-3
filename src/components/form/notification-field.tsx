import React, {useMemo} from 'react';
import {InputNumber, Select, Switch} from 'antd';
import {NotificationTimeType} from '../../types/event-form';
import {pluralize} from '../../utils/pluralize';
import '../../styles/notification-field.less';

export type FormNotification = {
    enabled: boolean;
    timeCount: number;
    timeType: NotificationTimeType;
}

export type NotificationFieldProps = {
    value?: FormNotification;
    onChange?: (val: FormNotification) => void;
}

export const initialFormNotification = {
    enabled: true,
    timeCount: 10,
    timeType: NotificationTimeType.Minute
}
const initialOnChange = () => {};

const MIN_TIME_COUNT = 1;

export const NotificationField: React.FC<NotificationFieldProps> = ({
    value = initialFormNotification,
    onChange = initialOnChange
}) => {
    const onChangeEnabled = (checked: boolean) => onChange({...value, enabled: checked});
    const onChangeTimeCount = (val: number | null) => onChange({...value, timeCount: val || MIN_TIME_COUNT});
    const onChangeTimeType = (val: NotificationTimeType) => onChange({...value, timeType: val});

    const notificationTimeTypeSelector = useMemo(() => (
        <Select
            value={value.timeType}
            onChange={onChangeTimeType}
            disabled={!value.enabled}
        >
            <Select.Option value={NotificationTimeType.Minute}>{pluralize(['Минута', 'Минуты', 'Минут'], value.timeCount)}</Select.Option>
            <Select.Option value={NotificationTimeType.Hour}>{pluralize(['Час', 'Часа', 'Часов'], value.timeCount)}</Select.Option>
            <Select.Option value={NotificationTimeType.Day}>{pluralize(['День', 'Дня', 'Дней'], value.timeCount)}</Select.Option>
        </Select>
    ), [value.enabled, value.timeCount, value.timeType]);

    return (
        <div className="notification-field">
            <InputNumber
                min={MIN_TIME_COUNT}
                disabled={!value.enabled}
                addonAfter={notificationTimeTypeSelector}
                value={value.timeCount}
                onChange={onChangeTimeCount}
            />
            <Switch
                className="ml-3"
                checked={value.enabled}
                onChange={onChangeEnabled}
            />
        </div>
    );
};
