import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";
// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'

const Dialogs = ({dialogsPage: {dialogs, messages}, sendMessage, isAuth}) => { //state.dialogsPage приходит.
    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values) => { // в values объекте будут свойства, такие как у Field.
        sendMessage(values.NewMessageBody);// values.NewMessageBody будет введёное значение лежать.
    }

    if (!isAuth) return <Navigate to={'/login'}/> // компонента из react-router-dom которая делает редирект на Login, если не залогиненый(isAuth = false)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    )
}



export default Dialogs;