// Здесь только форма, которая собирает данные:
import style from "../Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../../Utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={style.tb}>
                <Field component={Textarea} validate={[required, maxLength50]} name='NewMessageBody' placeholder="Введите сообщение"/>
                <button className={style.addMessage}>Добавить</button>
            </div>
        </form>
    )
}// Field аналог input в библ. redux-form. Name - под этим свойством уйдёт на сервак.
//handleSubmit - спец. пропс который даёт redux-form.(он не даст перезагр.страницы, т.к. где-то внутри
// написан e.preventDafault, т.е. отменить действие по умолчанию), так же в нём идёт сбор всех данных и
// упоковывается в объект, и контейнерная компонента вызывает props.onSubmit(formData(все значения
// из формы)), что вот они данные и их засабмитили из формы.

export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm) // оборачиваем компоненту AddMessageForm в AddMessageFormRedux,
// типо как mapStateToProps, какое уникальное имя дать этой форме которой оборачиваем. В общем state подраздел State.form.dialogAddMessageForm создастся.
// Только form этот это не то что в store, State.form.dialogAddMessageForm - эот form задаётся в store.