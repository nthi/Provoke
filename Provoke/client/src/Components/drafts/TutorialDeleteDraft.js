import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { deleteDraft, editDraft, getAllUnPublishedDraftsByUser, getDraftById } from "../../Managers/DraftManager";


export const TutorialDeleteDraft = () => {
    // const [oneUnpublishedDraft, setOneUnpublishedDraft] = useState({
    //     title: undefined,
    //     content: undefined
    // });
    const [draft, setDraft] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(
        () => {
            getDraftById(id)
                .then((d) => {setDraft(d)})
        },
        []
    )

    // useEffect(
    //     () => {
    //         getAllUnPublishedDraftsByUser()
    //             .then((draftTaco) => {
    //                 let unpublishedOne = draftTaco[0]
    //                 setOneUnpublishedDraft(unpublishedOne)
    //             })
    //     },
    //     []
    // )

    // const editOneUnpublishedDraft = () => {
    //     const updatedDraft = {
    //         id: oneUnpublishedDraft.id,
    //         userId: oneUnpublishedDraft.userId,
    //         title: oneUnpublishedDraft.title,
    //         content: oneUnpublishedDraft.content,
    //         dateCreated: oneUnpublishedDraft.dateCreated,
    //         published: true,
    //         placeholderId: oneUnpublishedDraft.placeholderId
    //     }
    //     editDraft(updatedDraft)
    // }

    //currently this does delete the post and navigate back to "/" but it does not edit the unpublished draft to update "published" to true. I know that updatedDraft exists in the component, but something is not connecting with the edit. What I want to see is the oneUnpublishedDraft to publish and already be in published feed by the time user navigates back to that view.
    const handleDelete = () => {
        deleteDraft(draft.id)
            .then(() => {
                navigate("/")
            })
    }

    return (
        <>
            <h2 className="tutorial-delete-sure">Are you sure you want to delete <i>{draft.title}</i>?</h2>
            <div className="tutorial-delete-takeback-span">
            <button className="tutorial-delete-button" onClick={handleDelete}>Delete</button>
            <a className="tutorial-take-back" href="/">No, take me back.</a>
            </div>
        </>
    )
}