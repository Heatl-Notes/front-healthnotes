import React, { useState, useEffect } from 'react';

import { fetchAddPatient } from '../../services/api';

const InputBox = ({ id, content, type, placeholder, value, onChange }) => {
    return (
        <div className="inputBox">
            <label htmlFor={id}>{content}</label>
            <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

const NewPatientFields = ({ newPatient, setNewPatient }) => {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPatient({
            ...newPatient,
            [name]: value,
        });
    };

    return (
        <div className="add-patient-input-group">
            <InputBox id="name" content="Nome:" type="text" placeholder="Nome do paciente" value={newPatient.newName} onChange={handleInputChange} />
            <InputBox id="cpf" content="CPF:" type="text" placeholder="CPF do paciente" value={newPatient.newCpf} onChange={handleInputChange} />
            <InputBox id="age" content="Idade:" type="text" placeholder="Idade do paciente" value={newPatient.newIdade} onChange={handleInputChange} />
            <InputBox id="comorbidities" content="Comorbidades:" type="text" placeholder="Comorbidades do paciente" value={newPatient.newComorbidades} onChange={handleInputChange} />
            <InputBox id="complexProcedures" content="Procedimentos:" type="text" placeholder="Procedimentos do paciente" value={newPatient.newProcedimentos} onChange={handleInputChange} />
        </div>
    )
};

export default NewPatientFields;


