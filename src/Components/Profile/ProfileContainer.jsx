import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from '../../Redux/ProfileReducer'
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export function withRouter(Children) { // Children - передаём компоненту.
    return (props) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() { // метод жизненного цикла.(componentDidMount - компонента уже вмонтирована)
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)


    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }// {...this.props} - раскукоживаем все приходящие пропсы и отправляем дальше в Profile.
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer); // ()() два вызова функции compose, вторые () означают вызов того, что вернули первые(), а не вызов два раза одинакового compose.
//более подробно про compose, она объединяет наши функции WithAuthRedirect, withRouter и connect, и вызывает их с параметром компонента ProfileContainer
//по сути делает WithAuthRedirect(ProfileContainer). Где WithAuthRedirect отслеживает авторизацию на сервер, и перенаправляет на стр. /login если не авториз.
