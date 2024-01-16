import React from "react";
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img src="https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.webp?b=1&s=170667a&w=0&k=20&c=375RBnqauhBmT48mK_W4PvE6bv6dmGhx8F0PJ5HF3so=" alt="" />
            </div>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large} />
                <ProfileStatus status={props.status} />
                </div>
        </div>
    )
}

export default ProfileInfo;