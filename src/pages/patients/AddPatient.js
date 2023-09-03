import React, { useState, useEffect } from 'react';

import { fetchAddPatient } from '../../services/api';

import './addPatient.css';
import NewPatientFields from './NewPatientFields';
import NewAppointmentFields from './NewAppointmentFields';

const Biu = ({ toggleAddPatientButton, updatePatientsList }) => {

    const [newPatient, setNewPatient] = useState({
        name: '',
        cpf: '',
        age: '',
        comorbidities: '',
        complexProcedures: '',
    });

    const [newCaregiverPatientInfo, setNewCaregiverPatientInfo] = useState({
        monthlyCost: 0,
        appointmentDays: {},
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const caregiverId = localStorage.getItem("userCpf");
        const response = await fetchAddPatient(caregiverId, {
            patientDTO: newPatient,
            caregiverPatientDTO: newCaregiverPatientInfo
        });
        if (response.ok) {
            console.log('Paciente adicionado com sucesso!');
            updatePatientsList();
            toggleAddPatientButton();
            // setSelectedDays([]);
        } else {
            console.error('Erro ao adicionar paciente');
        }
    };

    useEffect(() => {
        console.log(newCaregiverPatientInfo)
    }, [newCaregiverPatientInfo]);

    return (
        <div className="add-patient-container">
            <div className="add-patient-form">
                <form onSubmit={handleSubmit}>

                    <div className="add-patient-form-header">
                        <h2>Adicionar um novo Paciente</h2>
                        <button className="close-button" onClick={toggleAddPatientButton} type="button">X</button>
                    </div>
                    <NewPatientFields newPatient={newPatient} setNewPatient={setNewPatient} />
                    <NewAppointmentFields newCaregiverPatientInfo={newCaregiverPatientInfo} setNewCaregiverPatientInfo={setNewCaregiverPatientInfo}/>
                    <button className="submit-button" type="submit">Adicionar Paciente</button>

                </form>
            </div>
        </div>
    )
};

export default Biu;


