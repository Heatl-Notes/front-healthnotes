import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/authPage/Logon';
import Register from '../pages/authPage/Register';

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login className="biu" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
}
