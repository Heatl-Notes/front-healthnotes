import React from 'react';

import { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/config';

import hello from '../../assets/hello.jpg';

import './Dashboard.css';


const Dashboard = () => {

  const [numberPatients, setNumberPatients] = useState(0);
  const [caregiverData, setCaregiverData] = useState({});

  const caregiverId = localStorage.getItem('userCpf');

  const fetchCaregiverById = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching caregiver:', error);
        return [];
    }
  }

  const fetchNumberPatients = async (caregiverId) => {
    try {
        const response = await fetch(`${apiUrl}/caregiver/${caregiverId}/number-patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number patients:', error);
        return [];
    }
  }


  useEffect(() => {
      const getCaregiverData = async () => {
          const caregiverDataAux = await fetchCaregiverById(caregiverId);
          setCaregiverData(caregiverDataAux);
      };    
      const getnumberPatients = async () => {
          const numberPatientsAux = await fetchNumberPatients(caregiverId);
          setNumberPatients(numberPatientsAux);
      };

      getCaregiverData();
      getnumberPatients();
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
                <i className="fa fa-list-ol fa-2x text-yellow"></i>
                <div className="card_inner">
                    <p className="text-primary-p">Atendimentos do dia</p>
                    <span className="font-bold text-title">4</span>
                </div>
            </div>

            <div className="card-dashboard">
                <i className="fas fa-hand-holding-usd fa-2x text-green"></i>
                <div className="card_inner">
                    <p className="text-primary-p">Renda Mensal</p>
                    <span className="font-bold text-title">R$1.111</span>
                </div>
            </div>

            <div className="card-dashboard">
                <i className="fa fa-hospital fa-2x text-red"></i>
                <div className="card_inner">
                    <p className="text-primary-p">Categorias</p>
                    <span className="font-bold text-title">40</span>
                </div>
            </div>
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
                        <p>Funcionalidade nova! (AINDA NÃO IMPLEMENTADA)</p>
                    </div>
                </div>

                <div className="charts__right__cars">
                    
                    <div className="card1">
                        <h1>João</h1>
                        <p>8~10h</p>
                    </div>

                    <div className="card2">
                        <h1>Pedro</h1>
                        <p>10-12h</p>
                    </div>

                    <div className="card3">
                        <h1>Maria</h1>
                        <p>14-16h</p>
                    </div>

                    <div className="card4">
                        <h1>Laura</h1>
                        <p>16-18h</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Dashboard;


// const Dashboard = () => {

//   return (
//     <div className="container">

//       <Main />
      
//     </div>
//   );
// }

// export default Dashboard;
