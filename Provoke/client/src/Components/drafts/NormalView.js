//this module renders a textarea form for drafting and a published drafts sidebar

import { useEffect, useState } from "react"
import { getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js"
import { PublishedFeed } from "./PublishedFeed"

export default function NormalView() {
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])

    useEffect(() => {
        getAllPublishedDraftsByUser()
        .then (drafts =>  updatePublishedDrafts(drafts))
    }, [])

    //TODO: setup a handleSave
    // const handleSave = (e) => {
    //     e.preventDefault();
    //     newDraft = {
    //         title: 
    //     }

    // }
    
    return (
        <>
            <div>
                <PublishedFeed publishedDrafts={publishedDrafts}/>
            </div>
        </>
    )

}