import { useState } from "react";
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import logoHN from "../../assets/logoHN.jpg";

import "./style.css";

function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();

    try {
      // const response = await api.post('sessions', { id });
      
      // localStorage.setItem('ongId', id);
      // localStorage.setItem('ongName', response.data.name);

      navigate('/dashboard');
    }catch (err) {
      alert('Falha no login, tente novamente!!');
    } 
  }


  return (
    <div className="container-login">
      <div className="container-login-box">
        <div className="wrap-login">
          <form className="login-form">

            <div className="login-img">
              <img src={logoHN} alt="Logo Health Notes" />
            </div>

            <div className="login-message">
              <span className="login-form-title"> Bem vindo </span>
            </div>

            

 

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={handleLogin}>Login</button>
            </div>
            
            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <Link className="txt2" to="/register">
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Logon;