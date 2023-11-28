import React from "react";
import style from './MyPosts.module.css'
import Posts from "./Post/Post";


const MyPosts = () => {
    return (
        <div>
            Введите комментарий:
            <div className={style.main}>
                <textarea className={style.textarea}></textarea>
                <button className={style.add_post_btn}>Add post</button>
            </div>
            <div className={style.posts}>
                <Posts messege='Сообщение 1' likes=' 12'/>
                <Posts messege='Сообщение 2' likes=' 7'/>
                <Posts messege='Сообщение 3' likes=' 35'/>
            </div>
        </div>
    )
}

export default MyPosts;