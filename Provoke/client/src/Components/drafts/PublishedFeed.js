//this module creates the published drafts feed for the sidebar of NormalView.js
import { useEffect, useState } from "react"
import { Draft } from "./draft"

export const PublishedFeed = ({ publishedDrafts }) => {


    return (
        <>
            <h1>hello this is a published draft feed</h1>
            <div>
                {
                publishedDrafts.map(
                    (draft) =>
                    <Draft key={`published--${draft.id}`}
                    title={draft.title}
                    content={draft.content}
                    />
                )
                }
            </div>
        </>
    )


}