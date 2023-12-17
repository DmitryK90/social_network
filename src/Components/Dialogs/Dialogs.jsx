import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'

const Dialogs = (props) => { //store приходит только
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} />)
    let newMessageText = state.newMessageText; // 43 урок.

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
                    <textarea onChange={onMessageChange} value={newMessageText} className={style.textarea} placeholder="Введите сообщение"></textarea>
                    <button onClick={addMessage} className={style.addMessage}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;