//This module renders app views.
import React from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom"

export default function ApplicationViews() {
    return (
        <Routes>
        <Route path="*" element={<Navigate to="/" />} />
 
        </Routes>
    )
}