import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto} from '../../Redux/ProfileReducer'
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export function withRouter(Children) { // Children - передаём внутрь нашу компоненту.
    return (props) => {
        const match = {params: useParams()}; // тут будет id юзера.
        return <Children {...props} match={match}/> // в ProfileContainer передаём помимо всех props ещё match=id юзера, и возвращаем обновленную компоненту.
    }
}

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId; // id юзера сюда прийдёт.
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() { // метод жизненного цикла.(componentDidMount - компонента уже вмонтирована)
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) { // если id юзера изменился, то запускаем refreshProfile.
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId} // id юзера в boolean - true/false для отображения фото или заглушки.
                     savePhoto={this.props.savePhoto} // загрузка фото.
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }// {...this.props} - раскукоживаем все приходящие пропсы и отправляем дальше в Profile.
    // isOwner - проверка, владелец ли страницы. !! - приводит к булевому true/false.
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer); // ()() два вызова функции compose, вторые () означают вызов того, что вернули первые(), а не вызов два раза одинакового compose.
//более подробно про compose, она объединяет наши функции WithAuthRedirect, withRouter и connect, и вызывает их с параметром компонента ProfileContainer
//по сути делает WithAuthRedirect(ProfileContainer). Где WithAuthRedirect отслеживает авторизацию на сервер, и перенаправляет на стр. /login если не авториз.
