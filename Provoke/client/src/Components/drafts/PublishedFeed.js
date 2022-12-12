//this module creates the published drafts feed for the sidebar of NormalView.js
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Button } from "./Button"
import { Draft } from "./draft"

export const PublishedFeed = ({ publishedDrafts }) => {
    const [thisDraft, setThisDraft] = useState({});
    const {id} = useParams();

    useEffect(
        () => {
            
        },
        []
    )

    return (
        <>
            <div className="published-feed-column">
            <h1>Browse</h1>
            <div className="published-drafts-list">
                {
                publishedDrafts.map(
                    (draft) =>
                    <>
                    <Draft draftId={`published--${draft.id}`}
                    quote={draft.placeholder.quote}
                    author={draft.placeholder.author}
                    title={draft.title}
                    content={draft.content}
                    />

                    <div className="button-div">
                        <button className="edit-button">
                            Edit
                        </button>
                        <button className="delete-button">
                            Delete
                        </button>
                    </div>
                     {/* if user.normalMode === true, 
                    
                    <div className="button-div">
                    <Button className="edit-button" label="Edit" />
                    <Button className="delete-button" label="Delete" />
                    </div>
                   
                     else 
                    
                    <div className="button-div">
                    <Button className="emend-button" label="Emend" />
                    <Button className="excise-button" label="Excise" />
                    </div> */}
                
                    </> 
                )
                }
            </div>
            </div>
        </>
    )


}