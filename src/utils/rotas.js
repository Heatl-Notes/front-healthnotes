import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import PrivateRoute from './privateRoute';

import Main from '../components/main/Main'
// import Home from '../components/home/Home'

import Login from '../pages/logon/Logon';
import Register from '../pages/register/Register';

import Dashboard from '../pages/dashboard/Dashboard';
import Patients from '../pages/patients/Patients';
import PatientProfile from '../pages/patientProfile/PatientProfile';
import Profile from '../pages/profile/Profile';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login className="biu" />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Main><Dashboard /></Main>} />
                <Route path="/patients" element={<Main><Patients /></Main>} />
                <Route path="/patient/:patientId" element={<Main><PatientProfile /></Main>} />
                <Route path="/profile" element={<Main><Profile /></Main>} />


                {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientProfile />} />
        <Route path="/profile" element={<Profile />} /> */}


                {/* <Route path="/home" element={<Home />} /> */}




                {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientProfile />} />
        <Route path="/profile" element={<Profile />} /> */}



            </Routes>
        </BrowserRouter>
    );
}
