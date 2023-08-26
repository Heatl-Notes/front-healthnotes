import React from 'react';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';

// import { useNavigate } from 'react-router-dom';


import './style.css';

import AddPatient from './AddPatient';
import PatientsCards from './PatientsCards';

const Patients = () => {

    // const navigate = useNavigate();

    const [showAddPatientButton, setShowAddPatientButton] = useState(true);
    const toggleAddPatientButton = () => {setShowAddPatientButton(!showAddPatientButton);}

    const [patients, setPatients] = useState([]); 
    const fetchPatients = async () => {
        try {
            const response = await fetch(`${apiUrl}/patient`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setPatients(data); // Atualiza o estado com os dados dos pacientes
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    };

    const updatePatientsList = () => {
        // Chama a função de busca de pacientes novamente para atualizar a lista
        fetchPatients();
    };

    // Chamada da função de busca de pacientes quando o componente monta
    useEffect(() => {
        fetchPatients();
    }, []);



    return (
        <div className="main__container">

            <div className="main__title">
                <div className="main_greeting">
                <h1>Painel de Pacientes</h1>
                {/* <p> Bem vindo ao seu painel</p> */}
                </div>
            </div>

            {showAddPatientButton ? (
                <PatientsCards patients={patients} />
            ) : (
                <AddPatient toggleAddPatientButton={toggleAddPatientButton} updatePatientsList={updatePatientsList}/>
            )}

            {showAddPatientButton && (
                <button className="add-patient-button" onClick={toggleAddPatientButton}>
                    <i className="fas fa-user-plus"></i>
                </button>
            )}

        </div>
    )
};

export default Patients;


