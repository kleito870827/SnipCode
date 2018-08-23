import { combineReducers } from 'redux';
import defaultReducer from './default';
import authReducer from '../reducers/auth';
import snippetReducer from '../reducers/snippets';
import filterReducer from '../reducers/filters';
import currentSnippetReducer from '../reducers/currentSnippet';


export default combineReducers({
  auth: authReducer,
  snippets: snippetReducer,
  filters: filterReducer,
  current: currentSnippetReducer
});
