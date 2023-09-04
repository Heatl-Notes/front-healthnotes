import React from 'react';

import AuthRoutes from '../../utils/AuthRoutes';
import logoHN from "../../assets/logoHN.jpg";

import './authPage.css';

const AuthPage = () => {
    return (
        <div className="container-auth">
            <div className="container-auth-box">
                <div className="wrap-auth">
                    
                    <div className="auth-img">
                        <img src={logoHN} alt="Logo Health Notes" />
                    </div>

                    <AuthRoutes/>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;