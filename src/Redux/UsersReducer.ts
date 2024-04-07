import {usersAPI} from '../api/api'
import {PhotosType, UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // массив userId.
}
type InitialState = typeof initialState;
const UsersReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
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
                        return {...u, followed: false}
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
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return {
                ...state
            }
    }
}
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId}); // userId: userId, в коде сокращенно можно писать если ключ и значение одинаковые.

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});

type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

//---Thunk---
export const requestUsers = (page: number, pageSize: number) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента. getUsers БЫЛ ДО РЕФАКТОРА 81УРОК.
    return async (dispatch: any) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
        dispatch(toggleIsFetching(true)); // иконка загрузки отображается. Верён action = { type: TOGGLE_IS_FETCHING, isFetching } и прогонит его по UsersReducer.
        let data = await usersAPI.getUsers(page, pageSize); // ?page - параметры, getUsers() - это вынесеный запрос на сервер(из папки api, называется DAL - data axcess layer, уровень где происх. запровы на серв). Прийдёт только data, а не весь response, см код там почему.
        dispatch(toggleIsFetching(false)); // выключаем иконку загрузки.(диспатчим actioncreator-ы которые возвращают action объект)
        dispatch(setCurrentPage(page));
        dispatch(setUsers(data.items)); // в setUsers кидаем всех юзеров.
        dispatch(setTotalUsersCount(data.totalCount)); // в setTotalUsersCount кидаем общее кол-во юзеров.
    }
} // по сути эта санк функция импортируется в компонент контейнер, и вызываем её как колбэк функцию передавая в неё аргументы, а она в свою очередь
//возвращает функцию, которая возвращает при dispatch-е экшен креаторы(т.е. наш action, который выше по коду), и кидает его в наш UsersReducer, и так же делая запрос в
//наш DAL уровень где проиходит связь с сервером.

export const follow = (userId: number) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента.
    return async (dispatch: any) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
        dispatch(toggleIsFollowingProgress(true, userId)); // отключаем кнопку. 
        let response = await usersAPI.follow(userId); // передаём id пользователя на которого надо подписаться в api.js(наш DAL уровень)
        if (response.data.resultCode === 0) { // всё ОК, значит вносим изменение ы наш state, если пользователь добавлен, то в response в одном из параметров серв вернёт resultCode:0, если не ОК resultCode:1
            dispatch(followSuccess(userId));
        }
        dispatch(toggleIsFollowingProgress(false, userId));
    }
}

export const unfollow = (userId: number) => { // функция высшего порядка которая возвращает функцию, в которые при вызове передаём 2 аргумента.
    return (dispatch: any) => { // thunk , санк - это функция которая делает асинхронную работу и внутри кучу диспатчей делает.
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