import React from 'react';

import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';
import avatar from '../../assets/avatar.jpg'


const Navbar = ({ sidebarOpen, openSidebar }) => {

  const [caregiverData, setCaregiverData] = useState({});
  const caregiverId = localStorage.getItem('userCpf');

  const navigate = useNavigate();


  const fetchCaregiverById = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching caregiver:', error);
        return [];
    }
  }

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
          <Link className="button" to="/dashboard">Cadastrar Novo Caso</Link>

          <div className="navbar__right" onClick={goToProfile}>
            {/* <a href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a> */}

            {/* <a href="#">
              <i className="fa fa-search">Botao</i>
            </a> */}

            <div className="navbar__right__profile">
              <a href="#">
                <p>{caregiverData.name} {caregiverData.lastname}</p>
              </a>
              <a href="#">
                <img className="profile_image" src={avatar} alt="avatar"/>
              </a>
            </div>


          </div>
        </nav>
    )
}

export default Navbar;