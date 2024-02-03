import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../Image/Asset6.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

//ЧИСТАЯ КОМПОНЕНТА, ВСЁ ЧТО ТРЕБУЕТСЯ ПОЛУЧАЕТ ЧЕРЕЗ PROPS.

let User = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.usersPhoto}
                             alt="/"></img>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id) // отписываемся от пользователя, через api.js
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id) // подписываемся на пользователя, через api.js
                        }}>Follow</button>}

                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>)
}

export default User;