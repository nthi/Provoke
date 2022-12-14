//this module creates the published drafts feed for the sidebar of NormalView.js
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { TutorialDraft } from "./TutorialDraft"
import { Tooltip } from "react-tooltip";


export const TutorialPublishedFeed = ({ publishedDrafts }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="tutorial-published-feed-column">
            <h1 
            id="browse-element"
            data-tooltip-content="Look at all your posts! You can use the scrollbar!"
            className="tutorial-headline-styling">Browse</h1>
            <Tooltip 
                anchorId="browse-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20" />
            <div className="tutorial-published-drafts-list">
                {
                publishedDrafts.map(
                    (draft) =>
                    <>
                    <TutorialDraft draftId={`published--${draft.id}`}
                    quote={draft.placeholder.quote}
                    author={draft.placeholder.author}
                    title={draft.title}
                    content={draft.content}
                    />

                    <div className="tutorial-button-div">
                        <button 
                        id="emend-button-element"
                        data-tooltip-content="CLICK HERE TO EMEND POST (that means 'Edit')"
                        className="tutorial-emend-button" onClick={() => navigate(`/editdraft/${draft.id}`)}>
                            Emend
                        </button>
                        <Tooltip 
                anchorId="emend-button-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
                        <button 
                         id="excise-button-element"
                         data-tooltip-content="CLICK HERE TO EXCISE POST (that means 'Delete')"
                        className="tutorial-excise-button" onClick={() => navigate(`/deletedraft/${draft.id}`)}>
                            Excise
                        </button>
                        <Tooltip 
                anchorId="excise-button-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
                    </div>                  
                    </> 
                )
                }
            </div>
            </div>
        </>
    )


}