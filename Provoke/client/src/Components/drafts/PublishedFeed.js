//this module creates the published drafts feed for the sidebar of NormalView.js

import { useNavigate } from "react-router"
import { Button } from "./Button"
import { Draft } from "./draft"

export const PublishedFeed = ({ publishedDrafts }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="published-feed-column">
            <h1 className="headline-styling">Browse</h1>
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
                        <button className="edit-button" 
                        onClick={() => navigate(`/editdraft/${draft.id}`)}>
                            Edit
                        </button>
                        <button className="delete-button"
                        onClick={() => navigate(`/deletedraft/${draft.id}`)}>
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