import { useState } from 'react';

import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';


import './App.css';


const App = () => {

const [sidebarOpen, setSidebarOpen] = useState(false);
const openSidebar = () => {
  setSidebarOpen(true);
};
const closeSideBar = () => {
  setSidebarOpen(false);
};

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main />
      <Sidebar sidebarOpen={sidebarOpen} closeSideBar={closeSideBar} />
    </div>
  );
}

export default App;
