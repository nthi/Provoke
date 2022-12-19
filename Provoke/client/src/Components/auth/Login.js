import React, { useState } from "react";
// import { button, form, fieldset, label, input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Managers/UserManager";
import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  

  const loginSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then(r => {
        console.log(r)
        if (r){
          setIsLoggedIn(true)
          navigate('/')
        }
        else {
          alert("Invalid email or password")
        }
      })
  };

  return (
    <main className="login-image">
    <div className="login">
      <form onSubmit={loginSubmit}>
        <fieldset className="login-fieldset">
          <fieldset className="login-fieldset">
            <label className="email-label" htmlFor="email">Email</label>
            <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </fieldset>
          <fieldset className="login-fieldset">
            <label className="password-label" htmlFor="password">Password</label>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </fieldset>
          <fieldset className="button-fieldset">
            <button className="login-button">Login</button>
          </fieldset>
          <fieldset className="not-registered-link">
          <em>
            Not registered? <Link to="/register">Register</Link>
          </em>
          </fieldset>
        </fieldset>
      </form>
    </div>
    </main>
  );
}