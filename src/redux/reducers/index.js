import { combineReducers } from 'redux';
import defaultReducer from './default';
import authReducer from '../reducers/auth';


export default combineReducers({
  auth: authReducer
});
