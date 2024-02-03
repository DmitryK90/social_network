import React from "react";
import style from './DialogsItem.module.css'
import { NavLink } from "react-router-dom";

const DialogItem = ({name, id}) => {
    return (
        <div className={style.dialog + ' ' + style.active}>
            <NavLink to={'/dialogs/' + id}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;