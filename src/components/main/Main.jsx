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

    const [activeLink, setActiveLink] = useState(0);


    return (
        <div className="container">
            {/* <BrowserRouter> */}

                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} setActiveLink={setActiveLink} />
                <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} activeLink={activeLink} setActiveLink={setActiveLink} />
                <main>
                    <Rotas />
                </main>
            {/* </BrowserRouter> */}

        </div>
    );
};

export default Main;