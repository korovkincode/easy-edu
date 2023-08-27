import React from "react";
import { useState } from "react";

const Register = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const regUser = e => {
        e.preventDefault();
        // Make API Request to Register New user
        setLogin("");
        setPassword("");
        setError("Этот логин уже занят! Попробуйте другой")
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