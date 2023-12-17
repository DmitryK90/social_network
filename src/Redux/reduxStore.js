import { combineReducers, legacy_createStore} from 'redux';
import profileReducer from './ProfileReducer';
import dialogsReducer from './DialogsReducer';
import sidebarReducer from './SidebarReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

let store = legacy_createStore(reducers); // создали сам стор.

export default store;