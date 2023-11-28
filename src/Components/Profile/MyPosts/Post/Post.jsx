import React from "react";
import style from './Post.module.css'
import Atatar1 from '../../../../Image/Asset1.jpg'

const Posts = (props) => {
    return (
        <div>
            <div className={style.item}>
                <img src={Atatar1}></img>
                {props.messege}
                <div>
                    <span>Like</span>
                    {props.likes}
                    <span>Dislike</span>
                </div>
            </div>
        </div>
    )
}

export default Posts;