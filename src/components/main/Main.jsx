import React from 'react';

import { useState } from 'react';

import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

import './main.css';


const Main = ( {children} ) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {setSidebarOpen(true);};
    const closeSideBar = () => {setSidebarOpen(false);};

    return (
        <div className="container">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
            <main>
                {children}
            </main>
            
        </div>
    );
};

export default Main;