import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Layout from './components/layout';
import createStore from './store/create-store';
import {rootSaga} from './actions/root-saga';
import {rootReducer} from './reducers/root-reducer';
import './utils/dayjs-extensions.ts';
import './styles/index.less';

dayjs.locale('ru');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = createStore(rootReducer, rootSaga);

root.render(
    <Provider store={store}>
        <Router>
            <Layout />
        </Router>
    </Provider>
);
