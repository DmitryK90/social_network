import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => { //store приходит только
    console.log(props)
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;