import React from 'react';

import { useState, useEffect } from 'react';
import { fetchCaregiverById } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import './navbar.css';
import avatar from '../../assets/avatar.jpg'


const Navbar = ({ sidebarOpen, openSidebar }) => {
    const navigate = useNavigate();
    const caregiverId = localStorage.getItem('userCpf');
    
    const [caregiverData, setCaregiverData] = useState({});

    const goToProfile = () => {
        navigate('/profile');
    };

    useEffect(() => {
        const getCaregiverData = async () => {
            const caregiverDataAux = await fetchCaregiverById(caregiverId);
            setCaregiverData(caregiverDataAux);
        };
        getCaregiverData();
    }, []);

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fas fa-bars" aria-hidden="true"></i>
            </div>

            <div className="navbar__left">
                {/* <a href="#">Produtos</a>
            <a href="#">Usuários</a>
            <a href="#" className="active_link">Admin</a> */}
            </div>

            <div className="navbar__right" onClick={goToProfile}>
                {/* <a href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a> */}

                {/* <a href="#">
              <i className="fa fa-search">Botao</i>
            </a> */}

                <div className="navbar__right__profile">
                    <a href="/profile">
                        <p>{caregiverData.name} {caregiverData.lastname}</p>
                    </a>
                    <a href="/profile">
                        <img className="profile_image" src={avatar} alt="avatar" />
                    </a>
                </div>


            </div>
        </nav>
    )
}

export default Navbar;