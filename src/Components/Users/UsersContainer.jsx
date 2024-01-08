import React from "react";
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, toggleIsFollowingProgress, getUsers } from "../../Redux/UsersReducer";

// КОНТЕЙНЕРНАЯ КОМПОНЕНТА, ИМЕЕТ САМУ КОМПОНЕНТУ КЛАССОВУЮ И ВТОРАЯ КОНТЕЙНЕРНАЯ КОМПОНЕНТА КОТОРАЯ ПОЛУЧАЕТСЯ С ПОМОЩЬЮ CONNECT.

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); // вызывает колбэк thunk из UsersReducer. Получить список юзеров, там идёт запрос на сервер.
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize); // вызывает колбэк thunk из UsersReducer. При перелистывании запрашиваем новых пользователей.        
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
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

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}//приходит все в props <Users /> всё достаёт из state

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// } // это всё закинется в <Users /> в props.



// export default connect(mapStateToProps, { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC, toggleIsFetchingAC })(UsersContainer); // закидывает в <UsersContainer /> пропсы.
export default connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleIsFollowingProgress, getUsers })(UsersContainer); // закидывает в <UsersContainer /> пропсы.