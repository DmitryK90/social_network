const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}
let initialState = {
    dialogs: [
        { id: 1, name: 'Дмитрий' },
        { id: 2, name: 'Андрей' },
        { id: 3, name: 'Светлана' },
        { id: 4, name: 'Александр' },
        { id: 5, name: 'Виктор' },
        { id: 6, name: 'Валерий' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Привет' },
        { id: 2, message: 'Пока' },
        { id: 3, message: 'Как дела?' },
    ] as Array<MessageType>,
}
export type initialStateType = typeof initialState;
const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let body = action.NewMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
            // let stateCopy = { ...state };
            // stateCopy.messages = [...state.messages, { id: 4, message: body }];
            // return stateCopy;
        }
        default:
            return state;
    }
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE,
    NewMessageBody: string
}
export const addMessageActionCreator = (NewMessageBody: string): AddMessageActionCreatorType => ({ type: ADD_MESSAGE, NewMessageBody });

export default dialogsReducer;