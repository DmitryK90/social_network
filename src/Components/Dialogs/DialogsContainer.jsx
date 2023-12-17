import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/DialogsReducer'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = (state) => { // превратить часть state в пропсы.
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => { // передаём колл бэки в пропсы.
    return {
        updateNewMessageActionCreator: (text) => {
            dispatch(updateNewMessageActionCreator(text));
        },
        sendMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs) // SuperDialogsContainer - возвращает новые контейнерную компоненту..

export default DialogsContainer;