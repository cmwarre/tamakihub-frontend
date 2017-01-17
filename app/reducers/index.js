import { combineReducers } from 'redux';

// Reducers
import entityTableReducer from './entity-table-reducer';
import userReducer from './user-reducer';
import engineerReducer from './engineer-reducer';

// Combine Reducers
var reducers = combineReducers({
    engineerState: engineerReducer,
    entityTableState: entityTableReducer,
    userState: userReducer,
});

export default reducers;