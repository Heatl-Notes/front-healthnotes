import React, { useState, useEffect } from 'react';

import { fetchUpdatePatient } from '../../services/api';

import './PatientProfile.css';

const Patient = ({ patientData, setPatientData }) => {
    const [modoEdicao, setModoEdicao] = useState(false);
    const abrirModoEdicao = () => { setModoEdicao(true); };
    const sairModoEdicao = () => {
        setModoEdicao(false);
        resetPatientUpdated();
    };

    const [patientUpdated, setPatientUpdated] = useState({
        cpf: patientData.cpf,
        name: patientData.name,
        age: patientData.age,
        profilePhoto: patientData.profilePhoto
    });

    const resetPatientUpdated = () => {
        setPatientUpdated({
            cpf: patientData.cpf,
            name: patientData.name,
            age: patientData.age,
            profilePhoto: patientData.profilePhoto
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPatientUpdated({
            ...patientUpdated,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const response = await fetchUpdatePatient(patientUpdated);
        if (response.ok) {
            console.log('Paciente atualizado com sucesso!');
        } else {
            console.error('Erro ao atualizar paciente');
        }
    };

    useEffect(() => {
        resetPatientUpdated();
    }, [patientData])

    return (
        <div>
            {modoEdicao ? (
                <div className="patient__profile">
                    <div className="patient__profile__tittle">
                        <h2>Editar Dados do Paciente:</h2>
                        <button className="patient__profile__button__edit" onClick={sairModoEdicao}>Cancelar</button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group-patient-edit">
                            <label htmlFor="name">Nome: </label>
                            <input type="text" id="name" name="name" defaultValue={patientUpdated.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group-patient-edit">
                            <label htmlFor="age">Idade: </label>
                            <input type="text" id="age" name="age" defaultValue={patientUpdated.age} onChange={handleInputChange} />
                        </div>
                        <div className="form-group-patient-edit">
                            <label htmlFor="profilePhoto">Foto de perfil: </label>
                            <input type="text" id="profilePhoto" name="profilePhoto" defaultValue={patientUpdated.profilePhoto} onChange={handleInputChange} />
                        </div>

                        {/* <div className="form-group-patient-edit">
                            <label htmlFor="comorbidades">Comorbidades:   </label>
                            <input type="text" id="comorbidades" name="comorbidades" defaultValue="comorbidades" />
                        </div>
                        <div className="form-group-patient-edit">
                            <label htmlFor="email">Procedimentos:   </label>
                            <input type="text" id="procedimentos" name="procedimentos" defaultValue="procedimentos" />
                        </div> */}

                        <button className="edit-button" type="submit">Salvar</button>

                    </form>
                </div>
            ) : (
                <div className="patient__profile">
                    <div className="patient__profile__tittle">
                        <h2>Dados do Paciente:</h2>
                        <button className="patient__profile__button__edit" onClick={abrirModoEdicao}>Editar</button>
                    </div>

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

