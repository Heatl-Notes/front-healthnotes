import React from 'react';

import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

import Rotas from '../../utils/rotas';

import './main.css';


const Main = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => { setSidebarOpen(true); };
    const closeSideBar = () => { setSidebarOpen(false); };

    return (
        <div className="container">
            <BrowserRouter>

                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
                <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
                <main>
                    <Rotas />
                </main>
            </BrowserRouter>

        </div>
    );
};

export default Main;