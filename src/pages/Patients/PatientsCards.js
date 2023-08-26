import React from 'react';

import { useNavigate } from 'react-router-dom';

import './style.css';

const PatientsCards = ({ patients }) => {
    const navigate = useNavigate();

    const handleCardClick = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    return (
        <div className="patients__cards">
            {patients.map(patient => (
                <div className="patient_card" key={patient.cpf} onClick={() => handleCardClick(patient.cpf)}>
                <div className="card_image">
                        <img className="patient_image" alt={`Foto do paciente ${patient.name}`} src={patient.profilePhoto}></img>
                        {/* <img className="patient_image" src={patient.image} alt={`Imagem de ${patient.nome}`} /> */}
                    </div>
                    <div className="card_inner">
                        <p><span className="font-bold">Nome:</span> {patient.name}</p>
                        <p><span className="font-bold">Idade:</span> {patient.age}</p>
                        <p><span className="font-bold">Doenças crônicas:</span> {patient.comorbidities.map(comorbidade => comorbidade.description).join(', ')}</p>
                        <p><span className="font-bold">Procedimentos especializados:</span> {patient.complexProcedures.map(procedimento => procedimento.description).join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PatientsCards;


