import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => { //store приходит только
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;