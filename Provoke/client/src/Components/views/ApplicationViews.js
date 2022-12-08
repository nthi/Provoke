//This module renders app views.
import React from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom"
import Authorize from '../views/Authorized';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Hello from '../drafts/hello';

export default function ApplicationViews() {
    return (
       <Routes>
        {localStorage.getItem("userProfile") ?
        <Route path="/" element={<Hello />} />
        :
        <Route path="/" element={<Navigate to="/login" />} />
      }
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Hello  />} />
       </Routes>
    )
}