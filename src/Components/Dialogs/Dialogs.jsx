import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";
// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'

const Dialogs = (props) => { //store приходит только
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values) => { // в values объекте будут свойства, такие как у Field.
        props.sendMessage(values.NewMessageBody);// values.NewMessageBody будет введёное значение лежать.
    }

    if (!props.isAuth) return <Navigate to={'/login'}/> // компонента из react-router-dom которая делает редирект на Login, если не залогиненый(isAuth = false)

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