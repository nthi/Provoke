//this module renders a textarea form for drafting and a published drafts sidebar

import { placeholder } from "@babel/types"
import { useEffect, useState } from "react"
import { addDraft, getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js"
import { PublishedFeed } from "./PublishedFeed"
import "./NormalView.css"

export default function NormalView() {
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])

    const [newDraft, updateNewDraft] = useState({
        title: "",
        content: "",
        published: "",
        placeholderId: ""
    })

    useEffect(() => {
        getAllPublishedDraftsByUser()
        .then (drafts =>  updatePublishedDrafts(drafts))
    }, [])

    
    const handleSave = (e) => {
        e.preventDefault();
        const singleDraft = {
            title: newDraft.title,
            content: newDraft.content,
            published: true,
            placeholderId: 1
        }
        addDraft(singleDraft)
            .then(() => getAllPublishedDraftsByUser())
            .then((draftArray) => { updatePublishedDrafts(draftArray)})

    }
    
    return (
        <>
        <div className="normal-body">
            <div className="create-post-form">
            <fieldset>
                <div>
                    <input type="text" value={newDraft.title} 
                    onChange={
                        (evt) => {
                            const copy = { ...newDraft }
                            copy.title = evt.target.value
                            updateNewDraft(copy)
                        }
                    } />
                </div>
                <div>
                    <textarea name="draft" required autoFocus type="text"
                    className="form-control" value={newDraft.content} onChange={
                        (evt) => {
                            const copy = { ... newDraft }
                            copy.content = evt.target.value
                            updateNewDraft(copy)
                        }
                    } />
                </div>
                <button className="custom-green-button" type="submit" onClick={handleSave}>Publish</button>
            </fieldset>
            </div>
            <div>
                <PublishedFeed publishedDrafts={publishedDrafts}/>
            </div>
        </div>
        </>
    )

}