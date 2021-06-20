import auth from './reducers/auth';
import {combineReducers} from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import {routerReducer} from 'react-router-redux';
import {reducers,rootSagas} from './modules';
//
import {connectRouter} from 'connected-react-router';

const rootReducer = (history) => {
  return combineReducers({
    ...reducers,
    auth,
    common,
    home,
    router: connectRouter(history),
  })
};

export const sagas = rootSagas;
export default rootReducer;
