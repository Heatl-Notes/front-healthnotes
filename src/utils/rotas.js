import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// import PrivateRoute from './privateRoute';

import Main from '../components/main/Main'
// import Home from '../components/home/Home'

import Login from '../pages/authPage/Logon';
import Register from '../pages/authPage/Register';

import Dashboard from '../pages/dashboard/Dashboard';
import Patients from '../pages/patients/Patients';
import PatientProfile from '../pages/patientProfile/PatientProfile';
import Profile from '../pages/profile/Profile';


// import Main from '../components/main/Main';
import Navbar from '../components/navbar/Navbar';

export default function Rotas() {

    return (
        <Routes>
            {/* <Route path="/" element={<Login className="biu" />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}



            {/* <Route path="/" element={<Main><Dashboard /></Main>} />
                <Route path="/patients" element={<Main><Patients /></Main>} />
                <Route path="/patient/:patientId" element={<Main><PatientProfile /></Main>} />
                <Route path="/profile" element={<Main><Profile /></Main>} /> */}


            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient/:patientId" element={<PatientProfile />} />
            <Route path="/profile" element={<Profile />} />


            {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
    );
}
