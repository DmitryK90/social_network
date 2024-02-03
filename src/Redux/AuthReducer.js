import {authAPI} from '../api/api'
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
} // isAuth - показывает залогинены мы или нет.

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload // дуструкт.экшена.
            }
        }
        default:
            return {
                ...state
            }
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}); // Экшен креатор.

// ниже это thunk creator:
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me(); // возвращает promise.
    if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет.
        let {id, login, email} = response.data.data; // деструктуризация ответа.
        dispatch(setAuthUserData(id, email, login, true)); // соблюдать последовательность, что было в редьюсере!
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => { // вызывает его из Login.jsx.
    let response = await authAPI.login(email, password, rememberMe); // приходят данные с авториз., withCredentials проверка паторизации.
    if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет(или не прав. введены данные лог и пар).
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'; // с сервака ответ будет в чём ошибка в логине или пароле, в message придёт массив с одним значением.
        dispatch(stopSubmit('login', {_error: message})); //спец. экшен из redux-form, который прекращает submit формы. Пишем что стопаем 'login', вторым параметром передаём объект где указываем проблемные свойства.
    }
}

export const logout = () => async (dispatch) => { // сервак удаляет куку, и мы будем считаться анонимами.
     let response = await authAPI.logout(); // приходят данные с авториз., withCredentials проверка паторизации.
        if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет.
            dispatch(setAuthUserData(null, null, null, false)); // зануляемся.
        }
}

export default AuthReducer;