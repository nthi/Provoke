//this module renders a textarea form for drafting and a published drafts sidebar

import { useEffect, useState } from "react"
import { getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js"
import { PublishedFeed } from "./PublishedFeed"

export default function NormalView() {
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])

    const [newDraft, updateNewDraft] = useState({
        title: "",
        content: "",
        published: ""
    })

    useEffect(() => {
        getAllPublishedDraftsByUser()
        .then (drafts =>  updatePublishedDrafts(drafts))
    }, [])

    
    const handleSave = (e) => {
        e.preventDefault();
        newDraft = {
            title: newDraft.title,
            content: newDraft.content,
            published: true
        }
        
    }
    
    return (
        <>
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
                <button type="submit" onClick={handleSave}>Publish</button>
            </fieldset>
            <div>
                <PublishedFeed publishedDrafts={publishedDrafts}/>
            </div>
        </>
    )

}