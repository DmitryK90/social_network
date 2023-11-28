import React from "react";
import style from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
                <img src="https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.webp?b=1&s=170667a&w=0&k=20&c=375RBnqauhBmT48mK_W4PvE6bv6dmGhx8F0PJ5HF3so=" alt="" />
            </div>
            <div>ava+disk</div>    
            <MyPosts />        
        </div>
    )
}

export default Profile;