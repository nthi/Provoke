import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { editDraft, getDraftById } from "../../Managers/DraftManager";
import { Draft } from "./draft";

export const EditDraft = () => {
    const [draft, setDraft] = useState({
        title: undefined,
        content: undefined
    });
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(
        () => {
            getDraftById(id)
            .then((d) => {setDraft(d)})
        },
        []
    )
    
    const saveDraftEdit = (e) => {
        e.preventDefault();
        const updatedDraft = {
            id: draft.id,
            title: draft.title,
            content: draft.content
        }
        editDraft(updatedDraft)
            .then(() => {
                navigate("/");
            })
    }

    return (
        <form className="m-5" onSubmit={saveDraftEdit}>

            <label htmlFor="draft">Edit <b>"{draft.title}?"</b></label>
            <input type="text" value={draft.title} onChange={(e) => {
                const copy = { ...draft }
                copy.name = e.target.value
                setDraft(copy)
            }} className="form-control" id="draft" />

            <fieldset>
                <label for="content">Content</label>
                    <input type="textarea" name="content" required value={draft.content}
                        onChange={(e) => {
                            const copy = { ...draft };
                            copy.content = e.target.value;
                            setDraft(copy);
                        }} />
            </fieldset>
        <button>Save</button>
        <a href="/">No, take me back </a>

    </form>
    );

}

// type="submit" className="btn btn-primary mt-2 mr-5" onClick={saveDraftEdit}



