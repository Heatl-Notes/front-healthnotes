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
              <img className="patient_image" alt={`Foto do paciente ${patientData.name}`} src="data:image/png;base64,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"></img>
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
