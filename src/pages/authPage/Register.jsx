import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister } from '../../services/api';

const Register = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        name: "",
        lastname: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const response = await fetchRegister(newUser);

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } else {
            console.error("Erro ao cadastrar usuário");
        }
    };

    return (
        <form className="auth-form">

            <div className="auth-message">
                <span className="auth-form-title">
                    {" "}
                    Cadastro{" "}
                </span>
            </div>

            <div className="wrap-input">
                <input
                    id="name"
                    className={
                        newUser.name !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="Nome"
                ></span>
            </div>

            <div className="wrap-input">
                <input
                    id="lastname"
                    className={
                        newUser.lastname !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="lastname"
                    type="text"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="Sobrenome"
                ></span>
            </div>

            <div className="wrap-input">
                <input
                    id="email"
                    className={
                        newUser.email !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="Email"
                ></span>
            </div>

            <div className="wrap-input">
                <input
                    id="cpf"
                    className={
                        newUser.cpf !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="cpf"
                    type="text"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="CPF"
                ></span>
            </div>

            <div className="wrap-input">
                <input
                    id="password"
                    className={
                        newUser.password !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="Senha"
                ></span>
            </div>

            <div className="wrap-input">
                <input
                    id="confirmPassword"
                    className={
                        newUser.confirmPassword !== ""
                            ? "has-val input"
                            : "input"
                    }
                    name="confirmPassword"
                    type="password"
                    onChange={handleInputChange}
                />
                <span
                    className="focus-input"
                    data-placeholder="Confirmar Senha"
                ></span>
            </div>

            <div className="container-auth-form-btn">
                <button
                    className="auth-form-btn"
                    onClick={handleRegister}
                >
                    Cadastrar
                </button>
            </div>

            <div className="text-center">
                <span className="txt1">
                    Já possui uma conta?{" "}
                </span>
                <Link className="txt2" to="/">
                    Fazer login
                </Link>
            </div>
        </form>
    );
}

export default Register;
