import React, { useState, useEffect } from 'react';

import { fetchAddPatient } from '../../services/api';

import NewPatientFields from './NewPatientFields';


const daysOfWeekEnglish = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const daysOfWeekPortuguese = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const InputTimeBox = ({ id, content, type, placeholder, value, onChange }) => {
    return (
        <div className="inputTimeBox">
            <label htmlFor={id}>{content}</label>
            <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

const NewAppointmentFields = ({ newCaregiverPatientInfo, setNewCaregiverPatientInfo }) => {

    const [showAppointmentsFields, setShowAppointmentsFields] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleInputChange2 = (event) => {
        const { name, value } = event.target;
        setNewCaregiverPatientInfo({
            ...newCaregiverPatientInfo,
            [name]: value,
        });
    };

    const handleHorarioChange = (event, dayName, timeType) => {
        const { value } = event.target;
        setNewCaregiverPatientInfo((prevInfo) => ({
            ...prevInfo,
            appointmentDays: {
                ...prevInfo.appointmentDays,
                [dayName]: {
                    ...prevInfo.appointmentDays[dayName],
                    [timeType]: value,
                    dayName: dayName

                },
            },
        }));
    };

    const handleDayClick = (dayOfWeek) => {
        if (selectedDays.includes(dayOfWeek)) {
            setSelectedDays(selectedDays.filter((day) => day !== dayOfWeek));
        } else {
            setSelectedDays([...selectedDays, dayOfWeek]);
        }
    };

    useEffect(() => {
        console.log(newCaregiverPatientInfo)
    }, [newCaregiverPatientInfo]);

    return (
        <div className="add-patient-appointment-input-group">
            <div className="form-groupp">
                <input
                    type="checkbox"
                    id="mostrarInfoConsulta"
                    name="mostrarInfoConsulta"
                    checked={showAppointmentsFields}
                    onChange={() => setShowAppointmentsFields(!showAppointmentsFields)}
                />
                <label htmlFor="mostrarInfoConsulta">Adicionar informações de consulta</label>
            </div>

            {showAppointmentsFields && (
                <div className="appointment-info-container">
                    <h2>Informações da consulta</h2>
                    {/* <div className="appointment-info-header"> */}
                    {/* </div> */}

                    <div className="inputBox">
                        <label htmlFor="newProcedimentos">Custo Mensal:</label>
                        <input type="text" id="newCustoMensal" name="monthlyCost" placeholder="Custo mensal" value={newCaregiverPatientInfo.custoMensal} onChange={handleInputChange2} />
                    </div>


                    <div className="select-days">
                        <label>Selecione os dias de consulta:</label>

                        <div className="select-days-group">
                            {daysOfWeekEnglish.map((dayOfWeek, index) => (
                                <div className="select-days-box" key={dayOfWeek}>
                                    <input type='checkbox' onChange={() => handleDayClick(dayOfWeek)}></input>
                                    <label>{daysOfWeekPortuguese[index]}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="time-days">
                        {selectedDays.length > 0 && (<label>Horários das consultas:</label>)}
                        
                        {daysOfWeekEnglish.map((dayOfWeek, index) => (
                            selectedDays.includes(dayOfWeek) && (
                                <div className="time-days-group" key={dayOfWeek}>
                                    <label>{daysOfWeekPortuguese[index]}:</label>
                                    <div className="time-days-box">
                                        <InputTimeBox id={`start-time-${dayOfWeek}`}  type="time" onChange={(e) => handleHorarioChange(e, dayOfWeek, 'startTime')} />
                                        <label>às</label>
                                        <InputTimeBox id={`end-time-${dayOfWeek}`}  type="time" onChange={(e) => handleHorarioChange(e, dayOfWeek, 'endTime')} />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default NewAppointmentFields;



