import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPatientById } from '../../services/api';

import Patient from './Patient';
import Checklist from './Checklist';
import Agenda from './Agenda';

import './PatientProfile.css';

const PatientProfile = () => {
    const { patientId } = useParams();

    const [patientData, setPatientData] = useState({});

    useEffect(() => {
        const getPatientData = async () => {
            const patientData = await fetchPatientById(patientId);
            setPatientData(patientData);
        };
        getPatientData();
    }, [patientId]);

    return (

        <div className="main__container">

            <div className="main__title">

                <img className="patient_image" alt={`Foto do paciente ${patientData.name}`} src={patientData.profilePhoto}></img>
                <div className="main_greeting">
                    <h1>{patientData.name}</h1>
                </div>

            </div>

            <Patient patientData={patientData} />

            <div className="charts">
                <Agenda patientId={patientId} />
                <Checklist patientId={patientId} />
            </div>

        </div>
    );
}

export default PatientProfile;
