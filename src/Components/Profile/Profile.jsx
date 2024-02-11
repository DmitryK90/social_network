import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({profile, status, updateStatus, isOwner, savePhoto}) => { //store приходит только
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} savePhoto={savePhoto} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;