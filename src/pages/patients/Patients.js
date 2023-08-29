import React from 'react';
import { useState, useEffect } from 'react';
import { fetchPatients } from '../../services/api';

import './Patients.css';

import AddPatient from './AddPatient';
import PatientsCards from './PatientsCards';

const Patients = () => {

    const [showAddPatientButton, setShowAddPatientButton] = useState(true);
    const toggleAddPatientButton = () => { setShowAddPatientButton(!showAddPatientButton); }

    const [patientsList, setPatientsList] = useState([]);
    const updatePatientsList = async () => {
        const updatedPatientList = await fetchPatients();
        setPatientsList(updatedPatientList); // Atualiza o estado com os dados dos pacientes
    };

    useEffect(() => {
        updatePatientsList();
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
                <PatientsCards patientsList={patientsList} />
            ) : (
                <AddPatient toggleAddPatientButton={toggleAddPatientButton} updatePatientsList={updatePatientsList} />
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


