import React from 'react';

import { useState } from 'react';

import './PatientProfile.css';

const Patient = ({ patientData }) => {
    const [modoEdicao, setModoEdicao] = useState(false);
    const sairModoEdicao = () => {setModoEdicao(false);};
    const abrirModoEdicao = () => {setModoEdicao(true);};

  return (
    <div>
    {modoEdicao ? (
        <div className="patient__profile">
            <button className="patient__profile__button__edit" onClick={sairModoEdicao}>Cancelar</button>

            <form>
    
                <div className="form-group-patient-edit">
                    <label htmlFor="nome">Nome: </label>
                    <input type="text" id="nome" name="nome" defaultValue="José Silva" />
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
            <button className="patient__profile__button__edit" onClick={abrirModoEdicao}>Editar</button>

            <p><span className="font-bold">Cpf:</span> {patientData.cpf}</p>
            <p><span className="font-bold">Idade:</span> {patientData.age}</p>
            {patientData.comorbidities ? (
                <p><span className="font-bold">Comorbidades:</span> {patientData.comorbidities.map(comorbidade => comorbidade.description).join(', ')}</p>
            ) : (
                <p><span className="font-bold">Comorbidades:</span> Nenhuma comorbidade disponível</p>
            )}
            {patientData.complexProcedures ? (
                <p><span className="font-bold">Procedimentos:</span> {patientData.complexProcedures.map(procedimento => procedimento.description).join(', ')}</p>
            ) : (
                <p><span className="font-bold">Procedimentos:</span> Nenhum procedimento disponível</p>
            )}
        </div>
    )}
    </div>
  );
}

export default Patient;

