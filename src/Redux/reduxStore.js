import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import profileReducer from './ProfileReducer';
import dialogsReducer from './DialogsReducer';
import sidebarReducer from './SidebarReducer';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';
import {reducer as formReducer} from 'redux-form'; // для создания и отправки форм.
import {thunk} from 'redux-thunk';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

let store = legacy_createStore(reducers, applyMiddleware(thunk)); // создали сам стор. applyMiddleware - принять промежуточные слои, т.е. 
//вклинится со своей логикой в конвейер redux? не тольлько объекты обрабатываюся, но и функции теперь(thunk функции).

export default store;