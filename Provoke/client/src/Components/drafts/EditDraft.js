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
    //add alll the stuff to this draft/ user date etc.
    const saveDraftEdit = (e) => {
        e.preventDefault();
        const updatedDraft = {
            id: draft.id,
            userId: draft.userId,
            title: draft.title,
            content: draft.content,
            dateCreated: draft.dateCreated,
            published: draft.published,
            placeholderId: draft.placeholderId
        }
        editDraft(updatedDraft);
            navigate("/");
    }

    return (
        <>
        <div className="normal-body">
            <div className="create-post-form">
            <div className="compose-header">
                <h1 className="headline-styling">Edit Draft?</h1>
            </div>
            <fieldset className="fieldset-post-form">
                <div>
                    <input className="title-input" type="text" value={draft.title} 
                    onChange={
                        (evt) => {
                            const copy = { ...draft }
                            copy.title = evt.target.value
                            setDraft(copy)
                        }
                    } />
                </div>
                <div>
                    <textarea name="draft" required autoFocus type="text"
                    className="form-control" value={draft.content} onChange={
                        (evt) => {
                            const copy = { ... draft }
                            copy.content = evt.target.value
                            setDraft(copy)
                        }
                    } />
                </div>

                <div className="checkbox-button-span">
                    <button className="custom-green-button" type="submit" onClick={saveDraftEdit}>Save Changes</button>
                    <a href="/">No, take me back </a>

                
                </div>
            </fieldset>
            </div>
        </div>
        </>
    );

}

// type="submit" className="btn btn-primary mt-2 mr-5" onClick={saveDraftEdit}



