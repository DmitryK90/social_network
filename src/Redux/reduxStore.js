import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import profileReducer from './ProfileReducer';
import dialogsReducer from './DialogsReducer';
import sidebarReducer from './SidebarReducer';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';
import {reducer as formReducer} from 'redux-form'; // для создания и отправки форм.
import {thunk} from 'redux-thunk';
import AppReducer from "./AppReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: AppReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // это для расширения redux в гугл хроме. 2 строки. Не обязательно.
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// let store = legacy_createStore(reducers, applyMiddleware(thunk)); // создали сам стор. applyMiddleware - принять промежуточные слои, т.е.
// //вклинится со своей логикой в конвейер redux? не тольлько объекты обрабатываюся, но и функции теперь(thunk функции).
// Закоменчено, т.к. используем расширение в хроме, иначе можно так оставить.

export default store;