import { combineReducers } from 'redux';

import occasionsReducer from './occasions.slice';

const rootReducer = combineReducers({
  occasions: occasionsReducer,
});

export default rootReducer;
