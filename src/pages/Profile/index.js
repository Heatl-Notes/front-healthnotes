import React from 'react';

import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import hello from '../../assets/hello.jpg';


import './style.css';


const Profile = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {setSidebarOpen(true);};
  const closeSideBar = () => {setSidebarOpen(false);};

  const [modoEdicao, setModoEdicao] = useState(false);
  const sairModoEdicao = () => {setModoEdicao(false);};
  const abrirModoEdicao = () => {setModoEdicao(true);};

  const [caregiverData, setCaregiverData] = useState({});
  const caregiverId = localStorage.getItem('userCpf');

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


  useEffect(() => {
    const getCaregiverData = async () => {
      const caregiverDataAux = await fetchCaregiverById(caregiverId);
      setCaregiverData(caregiverDataAux);
      console.log(caregiverDataAux)
    };
    getCaregiverData();
  }, []);


  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <main>
        <div className="profile__container">
            
            <div className="profile__title">
              <div className="profile_greeting">
                <h1>Perfil do Cuidador</h1>
              </div>
            </div>

            {modoEdicao ? (
                <div className="profile__card">
                    <button className="profile__card__edit__link" onClick={sairModoEdicao}>Cancelar</button>
                    <img src={hello} alt="hello" />
                    
                    <form>

                        <div className="form-group">
                            <label htmlFor="email">Nome: </label>
                            <input type="email" id="email" name="email" defaultValue={caregiverData.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Sobrenome: </label>
                            <input type="email" id="email" name="email" defaultValue={caregiverData.lastname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" name="email" defaultValue={caregiverData.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Cpf:   </label>
                            <input type="text" id="cpf" name="cpf" defaultValue={caregiverData.cpf} />
                        </div>

                        <button className="edit-button">Salvar</button>

                    </form>
                </div>
            ) : (
                <div className="profile__card">
                    <button className="profile__card__edit__link" onClick={abrirModoEdicao}>Editar</button>
                    <img src={hello} alt="hello" />
                    <h1>{caregiverData.name} {caregiverData.lastname}</h1>
                    <p><span className="font-bold">Email:</span> {caregiverData.email}</p>
                    <p><span className="font-bold">Cpf:</span> {caregiverData.cpf}</p>
                </div>
            )}
        </div>
      </main>


      <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
    </div>
  );
}

export default Profile;
