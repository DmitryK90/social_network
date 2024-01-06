import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from '../../Redux/ProfileReducer'
import { useParams } from "react-router-dom";
import axios from "axios";

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() { // метод жизненного цикла.(componentDidMount - компонента уже вмонтирована)
        console.log(this.props)
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2
        }
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + userId).then(response => { // ?page - параметры
            this.props.setUserProfile(response.data); // приходит в response объект с инфой пользователя, который указан после .../profile/тут.
        })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }// {...this.props} - раскукоживаем все приходящие пропсы и отправляем дальше в Profile.
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));