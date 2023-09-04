import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from '../pages/authPage/Logon';
import Register from '../pages/authPage/Register';

export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login className="biu" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}
