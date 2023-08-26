import React from 'react';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../config';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Patient from './Patient';
import Checklist from './Checklist';
import Agenda from './Agenda';

import './style.css';

const PatientProfile = () => {
  const { patientId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {setSidebarOpen(true);};
  const closeSideBar = () => {setSidebarOpen(false);};

  const [patientData, setPatientData] = useState({});

  const fetchPatientById = async (patientId) => {
      try {
          const response = await fetch(`${apiUrl}/patient/${patientId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token'),
              },
          });
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching patient:', error);
          return [];
      }
  };

  useEffect(() => {
      const getPatientData = async () => {
          const patientData = await fetchPatientById(patientId);
          setPatientData(patientData);
      };
      getPatientData();
  }, [patientId]);

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />

      <main>
          <div className="main__container">
            <div className="main__title">
              <img className="patient_image" alt={`Foto do paciente ${patientData.name}`} src={patientData.profilePhoto}></img>
              <div className="main_greeting">
                <h1>{patientData.name}</h1>
              </div>
            </div>

            <Patient patientData={patientData} />

            <div className="charts">
                <Agenda patientId={patientId}/>
                <Checklist/>
            </div>
          </div>
      </main>

      
    </div>
  );
}

export default PatientProfile;
