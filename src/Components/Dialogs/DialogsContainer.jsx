import { addMessageActionCreator } from '../../Redux/DialogsReducer'
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => { // превратить часть state в пропсы.
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => { // передаём колл бэки в пропсы.
    return {
        sendMessage: (NewMessageBody) => {
            dispatch(addMessageActionCreator(NewMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect       
)(Dialogs); // ()() два вызова функции compose, вторые () означают вызов того, что вернули первые(), а не вызов два раза одинакового compose.
//более подробно про compose, она объединяет наши две функции WithAuthRedirect и connect, и вызывает их с параметром компонента Dialogs
//по сути делает WithAuthRedirect(Dialogs). Где WithAuthRedirect отслеживает авторизацию на сервер, и перенаправляет на стр. /login если не авториз.