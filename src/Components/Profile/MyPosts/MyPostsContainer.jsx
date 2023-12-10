import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/ProfileReducer';
import MyPosts from "./MyPosts";

//обёртка для компоненты MyPosts.
const MyPostsContainer = (props) => { // store приходит только. и state ещё
    // let state = props.store.getState();
    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);//пришёл объект экшен, диспатчим его, в store есть диспатч?
    }

    return (<MyPosts
        updateNewPostText={onPostChange}
        addPost={addPost}
        // posts={props.state.profilePage.posts}
        posts={props.state.profileReducer.posts} // мой
        // newPostText={props.state.profilePage.newPostText} />
        newPostText={props.state.profileReducer.newPostText} /> //мой
    )
}

export default MyPostsContainer;