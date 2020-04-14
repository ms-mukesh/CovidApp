import {combineReducers} from 'redux';
import getLoginReducer from './loginReducer' ;
import setApiDataReducer from './setApiDataReducer'

const rootReducer=combineReducers({getLoginReducer})

export default rootReducer;
