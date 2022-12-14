//this module creates the published drafts feed for the sidebar of NormalView.js
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { TutorialDraft } from "./TutorialDraft"

export const TutorialPublishedFeed = ({ publishedDrafts }) => {


    return (
        <>
            <div className="tutorial-published-feed-column">
            <h1 className="tutorial-headline-styling">Browse</h1>
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
                        <button className="tutorial-emend-button">
                            Emend
                        </button>
                        <button className="tutorial-excise-button">
                            Excise
                        </button>
                    </div>                  
                    </> 
                )
                }
            </div>
            </div>
        </>
    )


}