import React from 'react';

import { useState } from 'react';
import { fetchAddPatient } from '../../services/api';

import './Patients.css';

const AddPatient = ({ toggleAddPatientButton, updatePatientsList }) => {

    const [newPatient, setNewPatient] = useState({
        name: '',
        cpf: '',
        age: '',
        comorbidities: '',
        complexProcedures: '',
    });

    const [newCaregiverPatientInfo, setNewCaregiverPatientInfo] = useState({
        monthlyCost: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPatient({
            ...newPatient,
            [name]: value,
        });
    };

    const handleInputChange2 = (event) => {
        const { name, value } = event.target;
        setNewCaregiverPatientInfo({
            ...newCaregiverPatientInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetchAddPatient({
            patientDTO: newPatient, 
            atendimentoDTO: newCaregiverPatientInfo
        });
        if (response.ok) {
            console.log('Paciente adicionado com sucesso!');
            updatePatientsList();
            toggleAddPatientButton();
        } else {
            console.error('Erro ao adicionar paciente');
        }
    };

    const handleCancel = () => {
        // Limpa os campos do formulário e fecha o formulário
        setNewPatient({
            name: '',
            cpf: '',
            age: '',
            comorbidities: '',
            complexProcedures: '',
        });

        toggleAddPatientButton();
    };

    return (
        <div className="add-patient-form-container">

            <div className="add-patient-form">
                <h2>Dados do Paciente</h2>
                <form onSubmit={handleSubmit}>
                    <button className="close-button" onClick={handleCancel}>X</button>
                    <div className="form-group">
                        <label htmlFor="newName">Nome:</label>
                        <input type="text" id="newName" name="name" placeholder="Nome do paciente" value={newPatient.newName} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newCpf">CPF:</label>
                        <input type="text" id="newCpf" name="cpf" placeholder="CPF do paciente" value={newPatient.newCpf} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newIdade">Idade:</label>
                        <input type="text" id="newIdade" name="age" placeholder="Idade do paciente" value={newPatient.newIdade} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newComorbidades">Comorbidades:</label>
                        <input type="text" id="newComorbidades" name="comorbidities" placeholder="Comorbidades do paciente" value={newPatient.newComorbidades} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newProcedimentos">Procedimentos:</label>
                        <input type="text" id="newProcedimentos" name="complexProcedures" placeholder="Procedimentos do paciente" value={newPatient.newProcedimentos} onChange={handleInputChange} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="newProcedimentos">Custo Mensal:</label>
                        <input type="text" id="newCustoMensal" name="monthlyCost" placeholder="Custo mensal" value={newCaregiverPatientInfo.custoMensal} onChange={handleInputChange2} />
                    </div>


                    <button className="submit-button" type="submit">Adicionar Paciente</button>
                </form>
            </div>
        </div>
    )
};

export default AddPatient;


