// import dialogsReducer from "./DialogsReducer";
// import profileReducer from "./ProfileReducer";
// import sidebarReducer from "./SidebarReducer";

// let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Сообщение 1', likesCount: 12 },
//                 { id: 2, message: 'Сообщение 2', likesCount: 7 },
//                 { id: 3, message: 'Сообщение 3', likesCount: 35 },
//             ],
//             newPostText: '',
//         },
//         dialogsPage: {
//             dialogs: [
//                 { id: 1, name: 'Дмитрий' },
//                 { id: 2, name: 'Андрей' },
//                 { id: 3, name: 'Светлана' },
//                 { id: 4, name: 'Александр' },
//                 { id: 5, name: 'Виктор' },
//                 { id: 6, name: 'Валерий' }
//             ],
//             messages: [
//                 { id: 1, message: 'Привет' },
//                 { id: 2, message: 'Пока' },
//                 { id: 3, message: 'Как дела?' },
//             ],
//             newMessageText: ''
//         },
//         sideBar: {}
//     },
//     _callSubscriber() {
//         console.log('1')
//     },
//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         console.log('2')
//         this._callSubscriber = observer;
//     },
//     dispatch(action) {

//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sideBar = sidebarReducer(this._state.sideBar, action);

//         this._callSubscriber(); // (this._state) в видео.        
//     }
// }

// export default store;
// window.store = store;