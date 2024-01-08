import React from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import {SetAuthUserData} from '../../Redux/AuthReducer'

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true}).then(response => { // приходят данные с авториз., withCredentials проверка паторизации.
            if (response.data.resultCode ===0) { // resultCode это парам. на серваке который отобр. аторизацию, 0 - авториз, 1 - нет.
                let {Id, login, email} = response.data.data; // деструктуризация.
                this.props.SetAuthUserData(Id, login, email); // соблюдать последовательность, что было в редьюсере!
            }
        })
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {SetAuthUserData})(HeaderContainer);