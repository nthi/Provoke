import React, {useEffect, useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { getCurrentUser, logout } from '../../Managers/UserManager';
import "./TutorialNavBar.css"
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
//   } from 'reactstrap';

export default function TutorialNavBar({ isLoggedIn, setIsLoggedIn}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [localUser, setLocalUser] = useState("");
  
    useEffect(() => {
      const loggedInUser = getCurrentUser()
      setLocalUser(loggedInUser)
    }, [isLoggedIn]);
  
    return (
        <div className="tutorial-view-navbar">
            <h1 className="tutorial-nav-logo">Prevoke</h1>
        </div>
    );
  }
  