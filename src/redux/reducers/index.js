import { combineReducers } from 'redux';
import defaultReducer from './default';
import authReducer from './auth';
import snippetReducer from './snippets';
import filterReducer from './filters';
import currentSnippetReducer from './currentSnippet';
import error from './error';


export default combineReducers({
  auth: authReducer,
  snippets: snippetReducer,
  filters: filterReducer,
  current: currentSnippetReducer,
  error
});
