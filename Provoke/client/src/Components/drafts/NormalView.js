//this module renders a textarea form for drafting and a published drafts sidebar
import React from "react"
import { useEffect, useState } from "react"
import { addDraft, getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js"
import { PublishedFeed } from "./PublishedFeed"
import "./NormalView.css"
import { useParams } from "react-router-dom"
import { getCurrentUser } from "../../Managers/UserManager.js"
import { QuoteQueue } from "./QuoteQueue.js"
import { getAllPlaceholders } from "../../Managers/PlaceholderManager.js"
import { Checkbox } from "./Checkbox.js"

export const NormalView = () => {
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])
    // const [queQuote, updateQueQuote] = useState([]);
    const [oneQuote, setOneQuote] = useState([]);
    // const[filteredPlaceholders, setFilteredPlaceholders] = useState([])

    useEffect(() => {
        getAllPlaceholders()
        .then((placeTACO) => {
            let quotelist = placeTACO.filter(placeholder => placeholder.id !== 8);
            let randomQuote = quotelist[Math.floor(Math.random() * quotelist.length)];
            setOneQuote(randomQuote)
        })
    }, []);

    // console.log(placeholders);

    // console.log(placeholders);
    //if the user needs to see it, go in state. if we don't need to see it, don't put in state.
    //use effect needs to just set one quote, so not placeholderS, just placeholder.
    // let quotelist = placeholders.filter(placeholder => placeholder.id !== 8);
    // let randomQuote = quotelist[Math.floor(Math.random() * quotelist.length)];
    // console.log(placeholders);


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
            placeholderId: oneQuote.id
        }
        addDraft(singleDraft)
            .then(() => getAllPublishedDraftsByUser())
            .then((draftArray) => { updatePublishedDrafts(draftArray)})
            .then(() => updateNewDraft({        
            userId: "",
            title: "",
            content: "",
            dateCreated: "",
            published: "",
            placeholderId: ""}));
    }

    //onclick handler for checkbox 
    //event.target.checked = placeholderId = 8 (update oneQuote's state), else placeholderId = oneQuote.id
    



    return (
        <>
        <div className="normal-body">
            <div className="create-post-form">
            <div className="compose-header">
                <h1>Compose</h1>
                <div className="quote-card">
                <div><i>{oneQuote.quote}</i> <b>-- {oneQuote.author}</b></div>
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

                <div className="checkbox-button-span">
                <Checkbox label="Remove quotation" checked={true} />

                <button className="custom-green-button" type="submit" onClick={handleSave}>Publish</button>
                
                </div>
            </fieldset>
            </div>
            <div>
                <PublishedFeed publishedDrafts={publishedDrafts}/>
            </div>
        </div>
        </>
    )
}