import React from "react";

import { useState, useContext } from "react";

import { fetchLogin } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';

import { Link } from "react-router-dom";
import MyContext from "../../contexts/myContext";

const Logon = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAuthenticated } = useContext(MyContext);

    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetchLogin(email, password);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.tokenJWT);
            localStorage.setItem("userCpf", data.cpf);
            localStorage.setItem("userName", data.name);
            // navigate("/dashboard");
            console.log(isAuthenticated())
            setAuthenticated(isAuthenticated());
        } else {
            throw new Error("Falha no login, tente novamente!!");
        }
    }

    return (
        <form className="auth-form">

            <div className="auth-message">
                <span className="auth-form-title">
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

            <div className="container-auth-form-btn">
                <button
                    className="auth-form-btn"
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
    );
}

export default Logon;
