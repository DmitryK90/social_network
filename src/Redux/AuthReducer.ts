import {authAPI, securityAPI} from '../api/api'
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType2 = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null,
// }

export type InitialStateType = typeof initialState;
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
} // isAuth - показывает залогинены мы или нет.

const AuthReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload, // дуструкт.экшена.
            }
        }
        default:
            return {
                ...state
            }
    }
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionTypePayloadType
}
type SetAuthUserDataActionTypePayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | null
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean | null): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
}); // Экшен креатор.

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
}); // Экшен креатор.

// ниже это thunk creator:
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me(); // возвращает promise.
    if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет.
        let {id, login, email} = response.data.data; // деструктуризация ответа.
        dispatch(setAuthUserData(id, email, login, true)); // соблюдать последовательность, что было в редьюсере!
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => { // вызывает его из Login.jsx.
    const response = await authAPI.login(email, password, rememberMe, captcha); // приходят данные с авториз., withCredentials проверка паторизации.
    if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет(или не прав. введены данные лог и пар).
        dispatch(getAuthUserData()) // если мы залогинены, подгружаем getAuthUserData.
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl()); // если не авторизирован и пришёл код 10, то запрашивает капчу для проверки.
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'; // с сервака ответ будет в чём ошибка в логине или пароле, в message придёт массив с одним значением.
        dispatch(stopSubmit('login', {_error: message})); //спец. экшен из redux-form, который прекращает submit формы. Пишем что стопаем 'login', вторым параметром передаём объект где указываем проблемные свойства.
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => { // вызывает его из Login.jsx.
    const response = await securityAPI.getCaptchaUrl(); // запрашиваем капчу с сервака.
    const captchaUrl = response.data.url; // объект придёт, в котором url.
    dispatch(getCaptchaUrlSuccess(captchaUrl)); // в санку кидаем и диспатчим.
}

export const logout = () => async (dispatch: any) => { // сервак удаляет куку, и мы будем считаться анонимами.
    const response = await authAPI.logout(); // приходят данные с авториз., withCredentials проверка паторизации.
    if (response.data.resultCode === 0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет.
        dispatch(setAuthUserData(null, null, null, false)); // зануляемся.
    }
}

export default AuthReducer;