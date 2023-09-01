import React, { useState, useEffect } from 'react';

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

    const getDayOfWeek = (index) => {
        const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        return daysOfWeek[index];
    };
    const [newCaregiverPatientInfo, setNewCaregiverPatientInfo] = useState({
        monthlyCost: 0,
        listHorarios: Array.from({ length: 7 }, (_, index) => ({
            dayOfWeek: getDayOfWeek(index), // Função para obter o dia da semana com base no índice
            startTime: null,
            endTime: null
        })),
    });
    
    // Função para obter o nome do dia da semana com base no índice

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

    const handleHorarioChange = (event, dayOfWeek, timeType) => {
        const { value } = event.target;
        const updatedHorarios = newCaregiverPatientInfo.listHorarios.map((horario) => {
            if (horario.dayOfWeek === dayOfWeek) {
                return {
                    ...horario,
                    [timeType]: value,
                };
            }
            return horario;
        });
        setNewCaregiverPatientInfo({
            ...newCaregiverPatientInfo,
            listHorarios: updatedHorarios,
        });
    };

    useEffect(() => {
        console.log(newCaregiverPatientInfo)
    }, [newCaregiverPatientInfo]);

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

                    {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((dayOfWeek) => (
                        <div className="form-group" key={dayOfWeek}>
                            <label htmlFor={`start-time-${dayOfWeek}`}>Horário de atendimento na {dayOfWeek}</label>
                            <input
                                type="time"
                                id={`start-time-${dayOfWeek}`}
                                name={`startTime-${dayOfWeek}`}
                                onChange={(e) => handleHorarioChange(e, dayOfWeek, 'startTime')}
                            />
                            <input
                                type="time"
                                id={`end-time-${dayOfWeek}`}
                                name={`endTime-${dayOfWeek}`}
                                onChange={(e) => handleHorarioChange(e, dayOfWeek, 'endTime')}
                            />
                        </div>
                    ))}

                    <button className="submit-button" type="submit">Adicionar Paciente</button>
                </form>
            </div>
        </div>
    )
};

export default AddPatient;


