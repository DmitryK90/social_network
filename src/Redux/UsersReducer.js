import { usersAPI } from '../api/api'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return {
                ...state
            }
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId }); // userId: userId, в коде сокращенно можно писать если ключ и значение одинаковые.
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

//---Thunk---
export const getUsers = (currentPage, pageSize) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента.
    return (dispatch) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
        dispatch(toggleIsFetching(true)); // иконка загрузки отображается. Верён action = { type: TOGGLE_IS_FETCHING, isFetching } и прогонит его по UsersReducer.

        usersAPI.getUsers(currentPage, pageSize).then(data => { // ?page - параметры, getUsers() - это вынесеный запрос на сервер(из папки api, называется DAL - data axcess layer, уровень где происх. запровы на серв). Прийдёт только data, а не весь response, см код там почему.
            dispatch(toggleIsFetching(false)); // выключаем иконку загрузки.(диспатчим actioncreator-ы которые возвращают action объект)
            dispatch(setUsers(data.items)); // в setUsers кидаем всех юзеров.
            dispatch(setTotalUsersCount(data.totalCount)); // в setTotalUsersCount кидаем общее кол-во юзеров.
        })// запрос на сервер.
    }
} // по сути эта санк функция импортируется в компонент контейнер, и вызываем её как колбэк функцию передавая в неё аргументы, а она в свою очередь
//возвращает функцию, которая возвращает при dispatch-е экшен креаторы(т.е. наш action, который выше по коду), и кидает его в наш UsersReducer, и так же делая запрос в
//наш DAL уровень где проиходит связь с сервером.

export const follow = (userId) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента.
    return (dispatch) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
        dispatch(toggleIsFollowingProgress(true, userId)); // отключаем кнопку. 
        usersAPI.follow(userId) // передаём id пользователя на которого надо подписаться в api.js(наш DAL уровень)
            .then(response => { // если пользователь добавлен, то в response в одном из параметров серв вернёт resultCode:0, если не ОК resultCode:1
                if (response.data.resultCode === 0) { // всё ОК, значит вносим изменение ы наш state.
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleIsFollowingProgress(false, userId));
            });
    }
}

export const unfollow = (userId) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента.
    return (dispatch) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
        dispatch(toggleIsFollowingProgress(true, userId)); //отключаем кнопку.
        usersAPI.unfollow(userId) // отписываемся от пользователя. в api.js(наш DAL уровень)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleIsFollowingProgress(false, userId)); //включаем опять кнопку после изменения на сервере.
            });// делаем изменение follow/unfollow на сервере. {withCredentioals: true - почитать подробнее. headers:... ключ на серве прописан.
    }
}

export default UsersReducer;