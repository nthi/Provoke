import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      <Form onSubmit={registerClick}>
        <fieldset>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Nom de Guerre</Label>
            <Input id="displayName" type="text" onChange={e => setUserName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </div>
  );
}
