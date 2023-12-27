import React from "react";
import axios from "axios";
import Users from './Users'
import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC } from "../../Redux/UsersReducer";

// КОНТЕЙНЕРНАЯ КОМПОНЕНТА, ИМЕЕТ САМУ КОМПОНЕНТУ КЛАССОВУЮ И ВТОРАЯ КОНТЕЙНЕРНАЯ КОМПОНЕНТА КОТОРАЯ ПОЛУЧАЕТСЯ С ПОМОЩЬЮ CONNECT.

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}').then(response => { // ?page - параметры
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        })// запрос на сервер, НЕ МЕНЯЮТСЯ ПОЛЬЗОВАТЕЛИ!
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get('https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}').then(response => { // ?page - параметры
            this.props.setUsers(response.data.items)
        })
    }
    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged }
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow} />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}//приходит все в props <Users /> всё достаёт из state

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }
    }
} // это всё закинется в <Users /> в props.

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer); // закидывает в <UsersContainer /> пропсы.