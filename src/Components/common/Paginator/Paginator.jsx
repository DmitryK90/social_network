import React from "react";
import styles from './Paginator.module.css'

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize); //получили количество страниц пользователей, Math.ceil - округл. в больш.сторону до целого.
    let pages = []; //сюда собираем кол-вл страниц(1, 2, ..., 10)
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 10) {
            pages.push(i);
        }
    }
    return <div>
        {pages.map(p => {
            return <span className={currentPage === p && styles.selectedPage}
                         onClick={(e) => {
                             onPageChanged(p);
                         }}>{p}</span>
        })}
    </div>
}

export default Paginator;