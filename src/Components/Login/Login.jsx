import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../Utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Navigate} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
    return ( // Field аналог input в библ. redux-form. Name - под этим свойством уйдёт на сервак.
        //handleSubmit - спец. пропс который даёт redux-form.(он не даст перезагр.страницы, т.к. где-то внутри
        // написан e.preventDafault, т.е. отменить действие по умолчанию), так же в нём идёт сбор всех данных и
        // упоковывается в объект, и контейнерная компонента вызывает props.onSubmit(formData(все значения
        // из формы)), что вот они данные и их засабмитили из формы.
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'}
                       name={'email'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Password'}
                       type={'password'}
                       name={'password'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"}
                       name={'rememberMe'}
                       component={Input}/> remember me
            </div>
            {props.error && <div className={style.formSummaryError}>Error</div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm({ // оборачиваем компоненту LoginForm в это, типо как mapStateToProps.
    form: 'login' // какое уникальное имя дать этой форме которой оборачиваем. В общем state подраздел State.form.Login создастся.
    // Только form этот это не то что в store, State.form.Login - эот form задаётся в store.
})(LoginForm)

const Login = (props) => { // сюда приходит ещё колбэк login(не thunk creator, он в connect-е обрабатывается, а сюда уже сам колбэк приходит).
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) { // если залогинились, то редирект на страницу Profile.
        return <Navigate to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login); // в Login добавили колбэки из AuthReducer, а именно функцию thunk creator.