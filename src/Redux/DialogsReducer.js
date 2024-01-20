const ADD_MESSAGE = 'ADD-MESSAGE';

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
}

const dialogsReducer = (state = initialState, action) => {

    // let stateCopy = {
    //     ...state,

    // }

    switch (action.type) {
        case ADD_MESSAGE: {
            let body = action.NewMessageBody;
            let stateCopy = { ...state };
            stateCopy.messages = [...state.messages, { id: 4, message: body }];
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = (NewMessageBody) => ({ type: ADD_MESSAGE, NewMessageBody });

export default dialogsReducer;