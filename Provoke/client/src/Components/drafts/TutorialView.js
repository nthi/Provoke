import React from "react";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { addDraft, getAllPublishedDraftsByUser } from "../../Managers/DraftManager.js";
import { TutorialPublishedFeed } from "./TutorialPublishedFeed"
import "./TutorialView.css";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, updateUserMode } from "../../Managers/UserManager.js";
import { QuoteQueue } from "./QuoteQueue.js";
import { getAllPlaceholders } from "../../Managers/PlaceholderManager.js";
import { Checkbox } from "./Checkbox.js";
import 'react-tooltip/dist/react-tooltip.css'


export const TutorialView = () => {
    const navigate = useNavigate();
    //something to send draft to updated published drafts sidebar
    const [publishedDrafts, updatePublishedDrafts] = useState([])
    // const [queQuote, updateQueQuote] = useState([]);
    const [oneQuote, setOneQuote] = useState([]);
    // const[filteredPlaceholders, setFilteredPlaceholders] = useState([])
    // const [user, setUser] = useState({
    //     normalMode: undefined
    // })

    useEffect(() => {
        getAllPlaceholders()
        .then((placeTACO) => {
            let quotelist = placeTACO.filter(placeholder => placeholder.id !== 8);
            let randomQuote = quotelist[Math.floor(Math.random() * quotelist.length)];
            setOneQuote(randomQuote)
        })
    }, []);

    // useEffect(
    //     () => {
    //         getCurrentUser()
    //             .then((thisUser) => {setUser(thisUser)})
    //     },
    //     []
    // )

    const user = getCurrentUser();

    const handleTutorialEnd = () => {
        const updateUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            normalMode: true
        }
        return updateUserMode(updateUser);
        navigate("/")
    }

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

    const hideDraft = (e) => {
        e.preventDefault();
        const singleDraft = {
            userId: user.id,
            title: newDraft.title,
            content: newDraft.content,
            dateCreated: new Date(),
            published: false,
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
    

    return (
        <>
        <div className="tutorial-mode-end-div">
            <div className="tutorial-explainer">
            When you're done with tutorial mode, click
            </div>
            <button className="tutorial-end-button" onClick={handleTutorialEnd}>THE BUTTON</button>
        </div>
        <div className="tutorial-normal-body">
            <div 
            id="compose-form-element"
            data-tooltip-content="Welcome to PROVOKE! Try creating your first post!"
            className="tutorial-create-post-form">
                <Tooltip 
                anchorId="compose-form-element" style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
            <div className="tutorial-compose-header">
                <h1 className="tutorial-headline-styling">Compose</h1>
                <div className="tutorial-quote-card">
                <div><i>{oneQuote.quote}</i> <b>-- {oneQuote.author}</b></div>
                </div>
            </div>
            <fieldset className="tutorial-fieldset-post-form">
                <div>
                    <h3 className="tutorial-headline-styling">Title</h3>
                    <input 
                    id="title-form-element"
                    data-tooltip-content="People usually put a title here in this box!"
                    className="tutorial-title-input" type="text" value={newDraft.title} 
                    onChange={
                        (evt) => {
                            const copy = { ...newDraft }
                            copy.title = evt.target.value
                            updateNewDraft(copy)
                        }
                    } />
                    <Tooltip 
                anchorId="title-form-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
                </div>
                <div>
                    <h3 
                    id="content-form-element"
                    data-tooltip-content="This is where your text goes! Try typing it!"
                    className="tutorial-headline-styling">Draft</h3>
                    <textarea 
                    id="helpful-tip-element"
                    data-tooltip-content="If you have forgotten how to type, visit www.typing.com to learn how!"
                    name="draft" required autoFocus type="text"
                    className="tutorial-form-control" value={newDraft.content} onChange={
                        (evt) => {
                            const copy = { ... newDraft }
                            copy.content = evt.target.value
                            updateNewDraft(copy)
                        }
                    } />
                </div>
                    <Tooltip 
                anchorId="content-form-element"
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
                <Tooltip 
                anchorId="helpful-tip-element"
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>

                <div className="tutorial-checkbox-button-span">
                {/* <Checkbox label="Dispose" checked={true} /> */}
                <button id="red-button-element"
                data-tooltip-content="CLICK HERE TO CLEAR THIS FORM"
                className="tutorial-custom-red-button" type="submit" onClick={handleSave}>Dispose</button>
                <Tooltip 
                anchorId="red-button-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>

                <button id="green-button-element"
                data-tooltip-content="CLICK HERE TO PUBLISH YOUR DRAFT"
                className="tutorial-custom-green-button" type="submit" onClick={hideDraft}
                // data-tip data-for="registerTip"
                >Propose</button>
                <Tooltip 
                anchorId="green-button-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
                
                </div>
            </fieldset>
            </div>
            <div>
                <TutorialPublishedFeed publishedDrafts={publishedDrafts}/>
            </div>
        </div>
        </>
    )
}