//This module renders app views.
import React from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom"
import Authorize from '../views/Authorized';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Hello from '../drafts/hello';
import { NormalView } from "../drafts/NormalView";
import { EditDraft } from "../drafts/EditDraft";
import { DeleteDraft } from "../drafts/DeleteDraft";
// import { TutorialView } from "../drafts/TutorialView";

export default function ApplicationViews() {
    return (
       <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<NormalView  />} />
            {/* <Route path="/" element={<TutorialView /> } /> */}
            <Route path="/editdraft/:id" element={<EditDraft  />} />
            <Route path="/deletedraft/:id" element={<DeleteDraft  />} />

       </Routes>
    )
}