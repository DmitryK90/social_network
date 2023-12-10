import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'

const Dialogs = (props) => { //store приходит только
    // let state = props.dialogsPage;
    let dialogsElements = props.dialogsPage.dialogsReducer.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.dialogsPage.dialogsReducer.messages.map(m => <Message message={m.message} />)
    let newMessageBody = props.dialogsPage.dialogsReducer.NewMessageBody; // 43 урок.

    // let newMessageElement = React.createRef(); // сам делал.

    let addMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageActionCreator(text);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div className={style.tb}>
                    <textarea onChange={onMessageChange} value={props.dialogsPage.newMessageText} className={style.textarea} placeholder="Введите сообщение"></textarea>
                    <button onClick={addMessage} className={style.addMessage}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;