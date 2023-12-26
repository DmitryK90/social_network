import Users from "./Users";
import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC } from "../../Redux/UsersReducer";

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

export default connect(mapStateToProps, mapDispatchToProps)(Users);