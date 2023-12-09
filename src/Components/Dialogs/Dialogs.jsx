import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} />)

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.dispatch(updateNewMessageActionCreator(text));
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div className={style.tb}>
                    <textarea onChange={onMessageChange} value={props.dialogsPage.newMessageText} ref={newMessageElement} className={style.textarea} placeholder="Введите сообщение"></textarea>
                    <button onClick={addMessage} className={style.addMessage}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;