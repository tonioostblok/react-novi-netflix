import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// reducers
import authentication from './authentication';
import netflix from './netflix';

export default combineReducers({
  routing: routerReducer,
  authentication,
  netflix,
});
