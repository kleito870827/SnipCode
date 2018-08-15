import { combineReducers } from 'redux';
import defaultReducer from './default';
import authReducer from '../reducers/auth';
import snippets from '../reducers/snippets';
import filters from '../reducers/filters';
import currentSnippet from '../reducers/currentSnippet';


export default combineReducers({
  auth: authReducer,
  snippets: snippets,
  filters: filters,
  current: currentSnippet
});
