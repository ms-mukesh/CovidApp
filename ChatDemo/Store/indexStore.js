import {createStore,compose,applyMiddleware} from 'redux';
import mainReducer from '../Reducer/mainReducer';
import thunk from 'redux-thunk'

const store=createStore(mainReducer,compose(applyMiddleware(thunk)));
export default store;







