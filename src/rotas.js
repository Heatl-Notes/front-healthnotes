import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Profile from './pages/Profile';

export default function Rotas() {
  return (
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}
