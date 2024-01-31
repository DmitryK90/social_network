import profileReducer, {addPostActionCreator, deletePost} from "./ProfileReducer";
import React from "react";

let state = {
    posts: [
        { id: 1, message: 'Сообщение 1', likesCount: 12 },
        { id: 2, message: 'Сообщение 2', likesCount: 7 },
        { id: 3, message: 'Сообщение 3', likesCount: 35 },
    ],
}

it('length of posts should be increment', () => {
    let action = addPostActionCreator('it-incubator');

    let newState = profileReducer(state, action);
    //ожидание:
    expect(newState.posts.length).toBe(4);
})

it('message of new posts should be name', () => {
    let action = addPostActionCreator('it-incubator');

    let newState = profileReducer(state, action);
    //ожидание:
    expect(newState.posts[3].message).toBe('it-incubator');
})

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);
    //ожидание:
    expect(newState.posts.length).toBe(2);
})

it('after deleting length shouldnt be decrement if id is incorect', () => {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);
    //ожидание:
    expect(newState.posts.length).toBe(3);
})