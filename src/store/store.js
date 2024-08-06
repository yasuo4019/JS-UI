import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import fileConsumerReducer from '../features/dataConsumer/reducers';
import notificationReducer from '../store/notification/reducer';
import tableReducer from '../store/table/reducer';

const middleware = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers({
    notificationManager: notificationReducer,
    fileManager: fileConsumerReducer,
    table: tableReducer
});

const store = createStore(rootReducer, middleware);

export default store;
