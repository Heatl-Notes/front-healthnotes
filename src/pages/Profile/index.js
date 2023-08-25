import { useState } from 'react';
import React from 'react';

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
                    <div className="profile__card__edit__link" onClick={sairModoEdicao}>Cancelar</div>
                    <img src={hello} alt="hello" />
                    
                    <form>

                        <div className="form-group">
                            <label htmlFor="email">Nome: </label>
                            <input type="email" id="email" name="email" defaultValue="Raphael" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Sobrenome: </label>
                            <input type="email" id="email" name="email" defaultValue="Agra" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" name="email" defaultValue="raphael@email.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Cpf:   </label>
                            <input type="text" id="cpf" name="cpf" defaultValue="12345678911" />
                        </div>

                        <button className="edit-button">Salvar</button>

                    </form>
                </div>
            ) : (
                <div className="profile__card">
                    <div className="profile__card__edit__link" onClick={abrirModoEdicao}>Editar</div>
                    <img src={hello} alt="hello" />
                    <h1>Raphael Agra</h1>
                    <p><span class="font-bold">Email:</span> raphael@email.com</p>
                    <p><span class="font-bold">Cpf:</span> 12345678911</p>
                </div>
            )}
        </div>
      </main>


      <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
    </div>
  );
}

export default Profile;
