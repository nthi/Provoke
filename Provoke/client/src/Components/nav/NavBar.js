import React, {useEffect, useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { getCurrentUser, logout } from '../../Managers/UserManager';
import "./NavBar.css"
import TutorialNavBar from './TutorialNavBar';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
//   } from 'reactstrap';

export default function NavBar({ isLoggedIn, setIsLoggedIn}) {
    const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    const [localUser, setLocalUser] = useState("");
  
    useEffect(() => {
      const loggedInUser = getCurrentUser()
      setLocalUser(loggedInUser)
    }, [isLoggedIn]);

    if (localUser.normalMode === true) {
      return (
          <div className="normal-view-navbar">
              <h1 className="nav-logo">Provoke</h1>
          </div>
      )
    } else {
      return (
        <TutorialNavBar />
      )
    }
  
  }
  