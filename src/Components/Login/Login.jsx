import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../Utils/validators/validators";

const LoginForm = (props) => {
    return ( // Field аналог input в библ. redux-form. Name - под этим свойством уйдёт на сервак.
        //handleSubmit - спец. пропс который даёт redux-form.(он не даст перезагр.страницы, т.к. где-то внутри
        // написан e.preventDafault, т.е. отменить действие по умолчанию), так же в нём идёт сбор всех данных и
        // упоковывается в объект, и контейнерная компонента вызывает props.onSubmit(formData(все значения
        // из формы)), что вот они данные и их засабмитили из формы.
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'}
                       name={'login'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={'Password'}
                       name={'Password'}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"}
                       name={'RememberMe'}
                       component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm({ // оборачиваем компоненту LoginForm в это, типо как mapStateToProps.
    form: 'login' // какое уникальное имя дать этой форме которой оборачиваем. В общем state подраздел State.form.Login создастся.
    // Только form этот это не то что в store, State.form.Login - эот form задаётся в store.
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {

    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;