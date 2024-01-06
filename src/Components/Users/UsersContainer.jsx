import React from "react";
import axios from "axios";
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { connect } from "react-redux";
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching } from "../../Redux/UsersReducer";

// КОНТЕЙНЕРНАЯ КОМПОНЕНТА, ИМЕЕТ САМУ КОМПОНЕНТУ КЛАССОВУЮ И ВТОРАЯ КОНТЕЙНЕРНАЯ КОМПОНЕНТА КОТОРАЯ ПОЛУЧАЕТСЯ С ПОМОЩЬЮ CONNECT.

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true); // иконка загрузки отображается.
        axios.get('https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}').then(response => { // ?page - параметры
            // console.log(response.data)
            this.props.toggleIsFetching(false); // выключаем иконку загрузки.
            this.props.setUsers(response.data.items); // в setUsers кидаем всех юзеров.
            this.props.setTotalUsersCount(response.data.totalCount); // в setTotalUsersCount кидаем общее кол-во юзеров.
        })// запрос на сервер, НЕ МЕНЯЮТСЯ ПОЛЬЗОВАТЕЛИ!
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber); // изменяем currentPage, это номер активной страницы.
        this.props.toggleIsFetching(true); // иконка загрузки отображается.
        axios.get('https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}').then(response => { // ?page - параметры
            console.log(pageNumber, response.data); // ПОЧЕМУ-ТО СЕРВАК ПРИСЫЛАЕТ ТОТ ЖЕ СПИСОК! НЕЗАВИСИМО ОТ ИЗМЕНЕНИЯ СТРАНИЦЫ! ХОТЯ ВСЁ МЕНЯЕТСЯ В СТЕЙТЕ!this.props.currentPage нет раб!
            this.props.toggleIsFetching(false); // выключаем иконку загрузки.
            this.props.setUsers(response.data.items); // в массив users в state подгружаем список пользователей с сервака.
        })
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
        isFetching: state.usersPage.isFetching
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
export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer); // закидывает в <UsersContainer /> пропсы.