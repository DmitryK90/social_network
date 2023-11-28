import React from "react";
import style from './Header.module.css'
import Logo from '../../Logo_main.png'

const Header = () => {
    return (
        <header className={style.header}>
            <img src={Logo}></img>
        </header>
    )
}

export default Header;