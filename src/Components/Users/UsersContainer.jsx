import React from "react";
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {connect} from "react-redux";
import {follow, unfollow, setCurrentPage, toggleIsFollowingProgress, requestUsers} from "../../Redux/UsersReducer";
import {compose} from "redux";
import {
    getPageSize,
    getUsers,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from "../../Redux/UsersSelectors";

// КОНТЕЙНЕРНАЯ КОМПОНЕНТА, ИМЕЕТ САМУ КОМПОНЕНТУ КЛАССОВУЮ И ВТОРАЯ КОНТЕЙНЕРНАЯ КОМПОНЕНТА КОТОРАЯ ПОЛУЧАЕТСЯ С ПОМОЩЬЮ CONNECT.

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize); // вызывает колбэк thunk из UsersReducer. Получить список юзеров, там идёт запрос на сервер.
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize); // вызывает колбэк thunk из UsersReducer. При перелистывании запрашиваем новых пользователей.
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }//приходит все в props <Users /> всё достаёт из state

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}//приходит все в props <Users /> всё достаёт из state

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleIsFollowingProgress, requestUsers}),
    // WithAuthRedirect
)(UsersContainer);
// закидывает в <UsersContainer /> пропсы.
//WithAuthRedirect - передаём в HOC наш UsersContainer, он следит за авторизацией, если есть, то отрисовывает UsersContainer,
// если нет, то редиректит на страничку /login.

// ()() два вызова функции compose, вторые () означают вызов того, что вернули первые(), а не вызов два раза одинакового compose.
//более подробно про compose, она объединяет наши две функции WithAuthRedirect и connect, и вызывает их с параметром компонента UsersContainer
//по сути делает WithAuthRedirect(UsersContainer). Где WithAuthRedirect отслеживает авторизацию на сервер, и перенаправляет на стр. /login если не авториз.