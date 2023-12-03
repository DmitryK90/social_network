import React from "react";
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = props.state.messages.map(m => <Message message={m.message} />)

    let newMessageElement = React.createRef();

    let addMessage = () => {
        let message = newMessageElement.current.value;
        alert(message);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div className={style.tb}>
                    <textarea ref={newMessageElement} className={style.textarea} placeholder="Введите сообщение"></textarea>
                    <button onClick={addMessage} className={style.addMessage}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;