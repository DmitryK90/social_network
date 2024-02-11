import React from "react";
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../Image/Asset6.jpg'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if(!profile) {
        return <Preloader />
    }
    const mainPhotoSelecten = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div>
                {/*<img src="https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.webp?b=1&s=170667a&w=0&k=20&c=375RBnqauhBmT48mK_W4PvE6bv6dmGhx8F0PJ5HF3so=" alt="" />*/}
            </div>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={style.mainPhoto} />
                {isOwner && <input type={'file'} onChange={mainPhotoSelecten} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                </div>
        </div>
    )
}

export default ProfileInfo;