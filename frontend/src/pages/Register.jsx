import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context";

const Register = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {username, setUsername} = useContext(AuthContext);

    const regUser = e => {
        e.preventDefault();
        // Make API Request to Register New user
        if (login === "" || password === "") setError("Заполните все поля");
        else {
            localStorage.setItem("username", login);
            setUsername(login);
        }
    }

    return (
        <div className="reg__form">
            <form>
                <input className="reg__item" onChange={e => setLogin(e.target.value)} value={login} type="text" placeholder="Введите логин"></input>
                <input className="reg__item" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Введите пароль"></input>
                <button onClick={regUser} className="reg__item" type="submit">Зарегистрироваться</button>
                <br />
                <span className="error__label">{error}</span>
            </form>
        </div>
    )
}

export default Register;