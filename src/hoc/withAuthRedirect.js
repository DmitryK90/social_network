import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

// Хоки принято называть с приставкой - with.
// Этот HOC отвечает за редирект на страницу логина, если не залогинен на сервере.

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component) => { // принимает компонент. HOC, дополнительно оборачивает в компоненту, чтобы делать редирект.
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'}/> // компонента из react-router-dom которая делает редирект на Login, если не залогиненый(isAuth = false)
            return <Component {...this.props}/> // если авторизтрован, отрисовываем компонент и передаём все полученные props.
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); // оборачиваем ещё раз и добавляем подписку на isAuth

    return ConnectedAuthRedirectComponent;
}