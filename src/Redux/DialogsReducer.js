const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        { id: 1, name: 'Дмитрий' },
        { id: 2, name: 'Андрей' },
        { id: 3, name: 'Светлана' },
        { id: 4, name: 'Александр' },
        { id: 5, name: 'Виктор' },
        { id: 6, name: 'Валерий' }
    ],
    messages: [
        { id: 1, message: 'Привет' },
        { id: 2, message: 'Пока' },
        { id: 3, message: 'Как дела?' },
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let body = state.newMessageText;
            let stateCopy = { ...state };
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push({ id: 4, message: body });
            stateCopy.newMessageText = '';
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newMessageText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageActionCreator = (value) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: value
    }
}

export default dialogsReducer;