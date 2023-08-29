import { useState } from "react";
import React from "react";
import { fetchLogin } from '../../services/api';

import { Link, useNavigate } from "react-router-dom";

import logoHN from "../../assets/logoHN.jpg";

import "./Logon.css";

function Logon() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetchLogin(email, password);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.tokenJWT);
            localStorage.setItem("userCpf", data.cpf);
            localStorage.setItem("userName", data.name);
            navigate("/dashboard");
        } else {
            throw new Error("Falha no login, tente novamente!!");
        }
    }

    return (
        <div className="container-auth">
            <div className="container-login">
                <div className="container-login-box">
                    <div className="wrap-login">
                        <form className="login-form">
                            <div className="login-img">
                                <img src={logoHN} alt="Logo Health Notes" />
                            </div>

                            <div className="login-message">
                                <span className="login-form-title">
                                    {" "}
                                    Bem vindo{" "}
                                </span>
                            </div>

                            <div className="wrap-input">
                                <input
                                    className={
                                        email !== "" ? "has-val input" : "input"
                                    }
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span
                                    className="focus-input"
                                    data-placeholder="Email"
                                ></span>
                            </div>

                            <div className="wrap-input">
                                <input
                                    className={
                                        password !== ""
                                            ? "has-val input"
                                            : "input"
                                    }
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <span
                                    className="focus-input"
                                    data-placeholder="Password"
                                ></span>
                            </div>

                            <div className="container-login-form-btn">
                                <button
                                    className="login-form-btn"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
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
        </div>
    );
}

export default Logon;
