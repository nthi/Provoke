import React, { useState } from "react";
import { button, Form, fieldset, label, input } from 'reactstrap';

import { useNavigate } from "react-router-dom";
import { register } from "../../Managers/UserManager";

export default function Register ({ setIsLoggedIn })
{
    const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const user = { firstName, lastName, userName, email };
      register(user, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={registerClick}>
        <fieldset>
          <fieldset>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </fieldset>
          <fieldset>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </fieldset>
          <fieldset>
            <label htmlFor="displayName">Nom de Guerre</label>
            <input id="displayName" type="text" onChange={e => setUserName(e.target.value)} />
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </fieldset>
          <fieldset>
            <label for="password">Password</label>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </fieldset>
          <fieldset>
            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </fieldset>
          <fieldset>
            <button>Register</button>
          </fieldset>
        </fieldset>
      </form>
    </div>
  );
}
