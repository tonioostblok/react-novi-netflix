import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-unresolved
import createBrowserHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';

const historyOpts = {};

if (process.env.NODE_ENV === 'production') {
  const publicURL = process.env.PUBLIC_URL || '';
  if (publicURL.indexOf('://') !== -1) {
    historyOpts.basename = (new URL(process.env.PUBLIC_URL)).path;
  } else if (publicURL.indexOf('/') === 0) {
    historyOpts.basename = publicURL;
  } else {
    // eslint-disable-next-line no-console
    console.warn(`Warning: can't parse PUBLIC_URL of "${publicURL}"`);
  }
}

export const browserHistory = createBrowserHistory(historyOpts);

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(browserHistory),
];

if (process.env.NODE_ENV === 'development') {
  if (typeof window.devToolsExtension === 'function') {
    enhancers.push(window.devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
