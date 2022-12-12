//This module renders app views.
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom"
import { NormalView } from "../drafts/NormalView";
import { EditDraft } from "../drafts/EditDraft";
import { DeleteDraft } from "../drafts/DeleteDraft";
import { TutorialView } from "../drafts/TutorialView";
import { TutorialEditDraft } from "../drafts/TutorialEditDraft";
import { TutorialDeleteDraft } from "../drafts/TutorialDeleteDraft";
import { getCurrentUser } from "../../Managers/UserManager";

export default function ApplicationViews() {

    const [localUser, setLocalUser] = useState("");
  
    useEffect(() => {
      const loggedInUser = getCurrentUser()
      setLocalUser(loggedInUser)
    }, []);
//    const localUser = localStorage.getItem("user")
//    const localUserObject = JSON.parse(localUser)
//    console.log(localUser.normalMode);

    return (
        localUser?.normalMode === true ?
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<NormalView  />} />
                <Route path="/editdraft/:id" element={<EditDraft  />} />
                <Route path="/deletedraft/:id" element={<DeleteDraft  />} />
            </Routes>
        :
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<TutorialView  />} />
                <Route path="/editdraft/:id" element={<TutorialEditDraft  />} />
                <Route path="/deletedraft/:id" element={<TutorialDeleteDraft  />} />
            </Routes>           
    )
}