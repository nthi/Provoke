import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { deleteDraft, getDraftById } from "../../Managers/DraftManager";


export const DeleteDraft = () => {
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

    const handleDelete = () => {
        deleteDraft(draft.id)
            .then(() => {
                navigate("/")
            })
    }

    return (
        <>
            <h2 className="delete-sure">Are you sure you want to delete <i>{draft.title}</i>?</h2>
            <div className="delete-takeback-span">
            <button className="delete-button" onClick={handleDelete}>Delete</button>
            <a className="take-back" href="/">No, take me back.</a>
            </div>
        </>
    )
}