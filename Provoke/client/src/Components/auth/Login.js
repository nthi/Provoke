//This module allows a registered user to log in using a valid email address.
//Module also includes an alert for incorrect login information and a link to allow new users to register.

import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { register } from "../../Managers/UserManager";

export const Login = () => {
    const [email, set] = useState("");
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();

        login({ email, password })
        .then 
            {
            navigate("/")
            }
                else {
                    window.alert("Invalid login")
                }
            }
    
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Provoke</h1>
                    <h2>Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> User Email </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                    <label htmlFor="inputEmail"> Password </label>
                        <input type="password"
                            value={password}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Swordfish"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            SUBMIT
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Unprovoked? CLICK HERE to register</Link>
            </section>
        </main>
    )
}
