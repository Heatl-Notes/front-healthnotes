import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Logon';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Profile from './pages/Profile';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
