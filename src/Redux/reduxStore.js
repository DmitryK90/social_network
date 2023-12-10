import { combineReducers, legacy_createStore} from 'redux';
import profileReducer from './ProfileReducer';
import dialogsReducer from './DialogsReducer';
import sidebarReducer from './SidebarReducer';

let reducers = combineReducers({
    profileReducer, // profileReducer: profileReducer тоже самое, ключ: значение, только сокращённо.
    dialogsReducer,
    sidebarReducer
})

let store = legacy_createStore(reducers); // создали сам стор.

export default store;