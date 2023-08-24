import React from 'react';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import logoHN from "../../assets/logoHN.jpg";

import "./style.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // Realize a lógica de registro aqui
      // Exemplo: const response = await api.post('register', { firstName, lastName, email, cpf, password });
      
      // Navegue para a tela de home após o registro
      navigate('/home');
    } catch (err) {
      alert('Falha no cadastro, tente novamente!!');
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
              <span className="login-form-title"> Cadastro </span>
            </div>

            <div className="wrap-input">
              <input
                className={firstName !== "" ? "has-val input" : "input"}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
              <input
                className={lastName !== "" ? "has-val input" : "input"}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Sobrenome"></span>
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
                className={cpf !== "" ? "has-val input" : "input"}
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <span className="focus-input" data-placeholder="CPF"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="wrap-input">
              <input
                className={confirmPassword !== "" ? "has-val input" : "input"}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Confirmar Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={handleRegister}>Cadastrar</button>
            </div>

            <div className="text-center">
              <span className="txt1">Já possui uma conta? </span>
              <a className="txt2" href="/">
                Fazer login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
