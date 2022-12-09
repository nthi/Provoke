//this module renders a textarea form for drafting and a published drafts sidebar

import { placeholder } from "@babel/types"
import { useEffect, useState } from "react"
import { addDraft, getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js"
import { PublishedFeed } from "./PublishedFeed"
import "./NormalView.css"
import { useParams } from "react-router-dom"
import { getCurrentUser } from "../../Managers/UserManager.js"
import { QuoteQueue } from "./QuoteQueue.js"
import { getAllPlaceholders } from "../../Managers/PlaceholderManager.js"

export default function NormalView() {
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])
    // const [queQuote, updateQueQuote] = useState([]);
    const [placeholders, setPlaceholders] = useState([]);

    useEffect(() => {
        getAllPlaceholders()
        .then((placeholders) => setPlaceholders(placeholders))
    })


    const user = getCurrentUser();

    const [newDraft, updateNewDraft] = useState({
        userId: "",
        title: "",
        content: "",
        dateCreated: "",
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
            userId: user.id,
            title: newDraft.title,
            content: newDraft.content,
            dateCreated: new Date(),
            published: true,
            placeholderId: 2
        }
        addDraft(singleDraft)
            .then(() => getAllPublishedDraftsByUser())
            .then((draftArray) => { updatePublishedDrafts(draftArray)})
            // then reset state for draft. this does not work: .then(updateNewDraft());

    }
    
    return (
        <>
        <div className="normal-body">
            <div className="create-post-form">
            <div className="compose-header">
                <h1>Compose</h1>
                <div className="quote-card">
                {/* <div><i>{queQuote.quote}</i> <b>-- {queQuote.author}</b></div> */}

                </div>
            </div>
            <fieldset className="fieldset-post-form">
                <div>
                    <input className="title-input" type="text" value={newDraft.title} 
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