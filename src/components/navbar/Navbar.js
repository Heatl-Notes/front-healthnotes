import React from 'react';

import './Navbar.css';
import avatar from '../../assets/avatar.jpg'


const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <nav className="navbar">
          <div className="nav_icon" onClick={() => openSidebar()}>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true">&lt;</i>
          </div>

          <div className="navbar__left">
            {/* <a href="#">Produtos</a>
            <a href="#">Usuários</a>
            <a href="#" className="active_link">Admin</a> */}
          </div>

          <div className="navbar__right">
            {/* <a href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a> */}

            {/* <a href="#">
              <i className="fa fa-search">Botao</i>
            </a> */}

            <div className="navbar__right__profile">
              <a href="/profile">
                <p>Raphael Agra</p>
                <img className="profile_image" src={avatar} alt="avatar"/>
              </a>
            </div>


          </div>
        </nav>
    )
}

export default Navbar;