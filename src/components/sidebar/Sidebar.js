import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Sidebar.css';
import logoHN from '../../assets/logoHN.jpg';

const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToPatients = () => {
    navigate('/patients');
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
            <div className="sidebar__link" onClick={goToDashboard}>
              <i className="fas fa-tachometer-alt"></i>
              <a href="#">Dashboard</a>
            </div>
            <div className="sidebar__link" onClick={goToPatients}>
              <i className="fas fa-users"></i>
              <a href="#">Pacientes</a>
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
              <a href="#">Log out</a>
            </div>
          </div>

        </div>
    )
};

export default Sidebar;