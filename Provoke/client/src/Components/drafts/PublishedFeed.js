//this module creates the published drafts feed for the sidebar of NormalView.js
import { useEffect, useState } from "react"
import { Draft } from "./draft"

export const PublishedFeed = ({ publishedDrafts }) => {


    return (
        <>
            <div className="published-feed-column">
            <h1>Browse</h1>
            <div className="published-drafts-list">
                {
                publishedDrafts.map(
                    (draft) =>
                    <Draft draftId={`published--${draft.id}`}
                    quote={draft.placeholder.quote}
                    author={draft.placeholder.author}
                    title={draft.title}
                    content={draft.content}
                    />
                )
                }
            </div>
            </div>
        </>
    )


}