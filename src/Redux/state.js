import { rerenderEntireTree } from "../render";

let state = {
    profilePage: {
        posts: [
            { id: 1, message: 'Сообщение 1', likesCount: 12 },
            { id: 2, message: 'Сообщение 2', likesCount: 7 },
            { id: 3, message: 'Сообщение 3', likesCount: 35 },
        ],
        newPostText: '',
    },
    dialogsPage: {
        messages: [
            { id: 1, message: 'Привет' },
            { id: 2, message: 'Пока' },
            { id: 3, message: 'Как дела?' },
        ],
        dialogs: [
            { id: 1, name: 'Дмитрий' },
            { id: 2, name: 'Андрей' },
            { id: 3, name: 'Светлана' },
            { id: 4, name: 'Александр' },
            { id: 5, name: 'Виктор' },
            { id: 6, name: 'Валерий' }
        ]
    }
}

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText) => {   
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export default state;