import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthPage from './pages/authPage/AuthPage';
import { isAuthenticated } from './utils/auth';

import { useState, useEffect } from 'react';
import MyContext from './contexts/myContext'

import Main from './components/main/Main';

import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    return (
        <MyContext.Provider value={{ authenticated, setAuthenticated }}>
            <BrowserRouter>
                <div>
                    {authenticated ? (
                        <Main />
                    ) : (
                        <AuthPage />
                    )}
                </div>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default App;
