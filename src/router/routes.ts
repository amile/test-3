type Route = {
    path: string;
    label: string;
}

export const ROUTES: {[key: string]: Route} = {
    main: {
        path: '/',
        label: 'Главная',
    },
    calendar: {
        path: '/calendar',
        label: 'Календарь',
    },
    createEvent: {
        path: '/events/create',
        label: 'Добавить задачу',
    },
    editEvent: {
        path: '/events/:id/edit',
        label: 'Редактировать задачу',
    },
    events: {
        path: '/events/list/:month/:day',
        label: 'Список задач',
    },
    notFound: {
        path: '/not-found',
        label: 'Страница не найдена',
    }
};
