import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => { //store приходит только
    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store} state={props.state} />
        </div>
    )
}

export default Profile;