import React from "react";
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => { //store приходит только и state
    // let state = props.store.getState().dialogsPage;//43 урок.
    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageActionCreator(text));
    }

    return <Dialogs updateNewMessageActionCreator={onMessageChange} sendMessage={addMessage} dialogsPage={props.state} />
}

export default DialogsContainer;