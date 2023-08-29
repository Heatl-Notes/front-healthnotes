import React from 'react';

import { useState, useEffect } from 'react';
import { fetchCaregiverById } from '../../services/api';
import { Link } from 'react-router-dom';

import './navbar.css';
import avatar from '../../assets/avatar.jpg'


const Navbar = ({ sidebarOpen, openSidebar, setActiveLink }) => {
    // const navigate = useNavigate();
    const caregiverId = localStorage.getItem('userCpf');

    const [caregiverData, setCaregiverData] = useState({});

    const goToProfile = () => {
        // navigate('/profile');
        console.log("clicou");
        <Link to="/profile" />
    };

    useEffect(() => {
        const getCaregiverData = async () => {
            const caregiverDataAux = await fetchCaregiverById(caregiverId);
            setCaregiverData(caregiverDataAux);
        };
        getCaregiverData();
    }, []);

    const handleProfileClick = () => {
        setActiveLink(null);
    }

    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fas fa-bars" aria-hidden="true"></i>
            </div>

            <div className="navbar__left">
                {/* <a href="#">Produtos</a> */}
                {/* <a href="#">Usuários</a> */}
                {/* <a href="#" className="active_link">Admin</a> */}
            </div>

            <div className="navbar__right" >

                <div className="navbar__right__profile" onClick={handleProfileClick}>
                    <Link className="oi" to="/profile">
                        <p>{caregiverData.name} {caregiverData.lastname}</p>
                        {/* </Link> */}
                        {/* <Link className="oi" to="/profile"> */}
                        <img className="profile_image" src={avatar} alt="avatar" />
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;