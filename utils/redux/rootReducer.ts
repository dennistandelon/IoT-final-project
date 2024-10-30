import { combineReducers } from 'redux';
import pumpReducer from './pump/reducer';

const rootReducer = combineReducers({
  pump: pumpReducer,
});

export default rootReducer;
