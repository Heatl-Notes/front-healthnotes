import React from 'react';

import { useState, useEffect } from 'react';
import { fetchCaregiverById, fetchNumberPatients, fetchRendaMensal, fetchAppointmentsForDay } from '../../services/api';

import hello from '../../assets/hello.jpg';

import './Dashboard.css';

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const Dashboard = () => {

    const [numberPatients, setNumberPatients] = useState(0);
    const [rendaMensal, setRendaMensal] = useState(0);
    const [caregiverData, setCaregiverData] = useState({});

    const caregiverId = localStorage.getItem('userCpf');

    const getCaregiverData = async () => {
        const caregiverDataAux = await fetchCaregiverById(caregiverId);
        setCaregiverData(caregiverDataAux);
    };
    const getnumberPatients = async () => {
        const numberPatientsAux = await fetchNumberPatients(caregiverId);
        setNumberPatients(numberPatientsAux);
    };
    const getRendaMensal = async () => {
        const rendaMensalAux = await fetchRendaMensal(caregiverId);
        setRendaMensal(formatNumberWithComma(rendaMensalAux));
    };

    const formatNumberWithComma = (number) => {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };


    const currentDate = new Date();
    const currentDayName = daysOfWeek[currentDate.getDay()];
    const [todayName, setTodayName] = useState(currentDayName);
    const [appointmentsForDay, setAppointmentsForDay] = useState([{}]);
    console.log(appointmentsForDay)
    const getAppointmentsForDay = async (dayName) => {
        // console.log(dayName)
        const appointmentsForDayAux = await fetchAppointmentsForDay(caregiverId, dayName);
        // console.log(appointmentsForDayAux)
        setAppointmentsForDay(appointmentsForDayAux);
    };


    useEffect(() => {
        getCaregiverData();
        getnumberPatients();
        getRendaMensal();


        getAppointmentsForDay(todayName);
    }, []);


    return (
        <div className="main__container">
            <div className="main__title">
                <img src={hello} alt="hello" />
                <div className="main_greeting">
                    <h1>Olá {caregiverData.name}</h1>
                    <p> Bem vindo ao seu dashboard</p>
                </div>
            </div>

            <div className="main__cards">

                <div className="card-dashboard">
                    <i className="fa fa-users fa-2x text-lightblue"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Número de pacientes</p>
                        <span className="font-bold text-title">{numberPatients}</span>
                    </div>
                </div>

                <div className="card-dashboard">
                    <i className="fas fa-hand-holding-usd fa-2x text-green"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Renda Mensal</p>
                        <span className="font-bold text-title">{rendaMensal}</span>
                    </div>
                </div>

                <div className="card-dashboard">
                    <i className="fa fa-list-ol fa-2x text-yellow"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Atendimentos do dia</p>
                        <span className="font-bold text-title">{appointmentsForDay.length}</span>
                    </div>
                </div>

                {/* <div className="card-dashboard">
                    <i className="fa fa-hospital fa-2x text-red"></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Categorias</p>
                        <span className="font-bold text-title">40</span>
                    </div>
                </div> */}
            </div>

            <div className="charts">

                <div className="charts__left">
                    <div className="charts__left__title">
                        <div>
                            <h1>Lembretes</h1>
                            <p>Funcionalidade nova! (AINDA NÃO IMPLEMENTADA)</p>

                        </div>

                    </div>
                </div>

                <div className="charts__right">
                    <div className="charts__right__title">
                        <div>
                            <h1>Horários de Atendimento</h1>
                            {/* <p>Funcionalidade nova! (AINDA NÃO IMPLEMENTADA)</p> */}
                        </div>
                    </div>

                    <div className="charts__right__cars">
                        {appointmentsForDay.map(appointment => (
                            <div className="card3" key={String(appointment.id)}>
                                <h1>{appointment.patientName}</h1>
                                <p>{appointment.startTime} até às {appointment.endTime}</p>
                            </div>
                        ))}
 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
