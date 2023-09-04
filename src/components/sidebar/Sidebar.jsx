import React from 'react';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './sidebar.css';
import logoHN from '../../assets/logoHN.jpg';

const Sidebar = ({ sidebarOpen, closeSideBar, activeLink, setActiveLink }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        // navigate('/login');
    }

    const goToDashboard = () => {
        navigate('/');
        // <Link to="/"/>
    };

    const goToPatients = () => {
        navigate('/patients');
        // <Link to="/patients"/>
    };

    const handleLinkClick = (index) => {
        setActiveLink(index);
    };


    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={logoHN} alt="logo" />
                    <h1>Health Notes</h1>
                </div>

                <i
                    onClick={() => closeSideBar()}
                    className="fa fa-times"
                    id="sidebarIcon"
                    aria-hidden="true"
                ></i>
            </div>
            <div className="sidebar__menu">
                {/* <div className="sidebar__link active_menu_link">
              <i className="fa fa-minus-square"></i>
              <a href="#">Dashboard</a>
            </div> */}

                <h2>ADMIN</h2>
                <div
                    className={`sidebar__link ${activeLink === 0 ? 'active_menu_link' : ''}`}
                    onClick={() => handleLinkClick(0)}
                >
                    <i className="fas fa-tachometer-alt"></i>
                    <Link to="/">Dashboard</Link>
                </div>
                <div
                    className={`sidebar__link ${activeLink === 1 ? 'active_menu_link' : ''}`}
                    onClick={() => handleLinkClick(1)}
                >
                    <i className="fas fa-users"></i>
                    <Link to="/patients">Pacientes</Link>
                </div>
                {/* <div className="sidebar__link">
              <i className="fa fa-archive"></i>
              <a href="#">Produtos</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-bars"></i>
              <a href="#">Categorias</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-cutler"></i>
              <a href="#">Pedidos</a>
            </div>

            <h2>PESSOAS</h2>
            <div className="sidebar__link">
              <i className="fa fa-male"></i>
              <a href="#">Administradores</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-user-circle"></i>
              <a href="#">Usuários</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-money"></i>
              <a href="#">Pagamentos e custos</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-tasks"></i>
              <a href="#">A plataforma</a>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-file-text"></i>
              <a href="#">Política de privacidade</a>
            </div> */}
                <div className="sidebar__logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <a href="/">Log out</a>
                </div>
            </div>

        </div>
    )
};

export default Sidebar;