import React from "react";
import style from './Header.module.css'
import Logo from '../../Logo_main.png'

const Header = () => {
    return (
        <header className={style.header}>
            <img src={Logo} alt=""></img>
        </header>
    )
}

export default Header;