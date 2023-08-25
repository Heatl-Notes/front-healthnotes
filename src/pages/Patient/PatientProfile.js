import { useState } from 'react';
import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/main/Main';


import './style.css';


const PatientProfile = () => {
    const [modoEdicao, setModoEdicao] = useState(false);
    const sairModoEdicao = () => {setModoEdicao(false);};
    const abrirModoEdicao = () => {setModoEdicao(true);};

  return (
    <div>
    {modoEdicao ? (
        <div className="patient__profile">
            <div className="patient__profile__button__edit" onClick={sairModoEdicao}>Cancelar</div>                    
            <form>
    
                <div className="form-group-patient-edit">
                    <label htmlFor="nome">Nome: </label>
                    <input type="text" id="nome" name="nome" defaultValue="José Silva" />
                </div>
                <div className="form-group-patient-edit">
                    <label htmlFor="cpf">Cpf: </label>
                    <input type="cpf" id="cpf" name="cpf" defaultValue="11122233344" />
                </div>
                <div className="form-group-patient-edit">
                    <label htmlFor="idade">Idade: </label>
                    <input type="text" id="idade" name="idade" defaultValue="77" />
                </div>
                <div className="form-group-patient-edit">
                    <label htmlFor="comorbidades">Comorbidades:   </label>
                    <input type="text" id="comorbidades" name="comorbidades" defaultValue="comorbidades" />
                </div>
                <div className="form-group-patient-edit">
                    <label htmlFor="email">Procedimentos:   </label>
                    <input type="text" id="procedimentos" name="procedimentos" defaultValue="procedimentos" />
                </div>
    
                <button className="edit-button">Salvar</button>
    
            </form>
        </div>
    ) : (
        <div className="patient__profile">
            <div className="patient__profile__button__edit" onClick={abrirModoEdicao}>Editar</div>
            
            <p><span class="font-bold">Cpf:</span> 12345678911</p>
            <p><span class="font-bold">Idade:</span> 77</p>
            <p><span class="font-bold">Comorbidades:</span> comorbidades</p>
            <p><span class="font-bold">Procedimentos:</span> procedimentos</p>
        </div>
    )}
    </div>
  );
}

export default PatientProfile;

