import React, { useState } from "react";
// import { button, form, fieldset, label, input } from 'reactstrap';
import { useNavigate, link } from "react-router-dom";
import { login } from "../../Managers/UserManager";

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
    <div className="m-5">
      <form onSubmit={loginSubmit}>
        <fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </fieldset>
          <fieldset>
            <label for="password">Password</label>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </fieldset>
          <fieldset>
            <button>Login</button>
          </fieldset>
          <em>
            Not registered? <link to="/register">Register</link>
          </em>
        </fieldset>
      </form>
    </div>
  );
}