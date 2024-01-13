import { authAPI } from '../api/api'

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
                ...action.data, // дуструкт.экшена.
                isAuth: true,
            };
        }
        default:
            return {
                ...state
            }
    }
}

const SetAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login} });

export const getAuthUserData = () => dispatch => {
        authAPI.me().then(response => { // приходят данные с авториз., withCredentials проверка паторизации.
            if (response.data.resultCode ===0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авторизирован, 1 - нет.
                let {Id, login, email} = response.data.data; // деструктуризация.
                dispatch(SetAuthUserData(Id, login, email)); // соблюдать последовательность, что было в редьюсере!
            }
        })
    }


export default AuthReducer;