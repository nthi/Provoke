import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { editDraft, getDraftById } from "../../Managers/DraftManager";

export const TutorialEditDraft = () => {
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
            content: `We're no strangers to love
            You know the rules and so do I (do I)
            A full commitment's what I'm thinking of
            You wouldn't get this from any other guy
            I just wanna tell you how I'm feeling
            Gotta make you understand
            Never gonna give you up
            Never gonna let you down
            Never gonna run around and desert you
            Never gonna make you cry
            Never gonna say goodbye
            Never gonna tell a lie and hurt you`,
            dateCreated: draft.dateCreated,
            published: draft.published,
            placeholderId: draft.placeholderId
        }
        editDraft(updatedDraft);
            navigate("/");
    }

    return (
        <>
        <div className="tutorial-normal-body">
            <div className="tutorial-create-post-form">
            <div className="tutorial-compose-header">
                <h1 className="tutorial-headline-styling">Edit Draft?</h1>
            </div>
            <fieldset className="tutorial-fieldset-post-form">
                <div>
                    <input className="tutorial-title-input" type="text" 
                    value={draft.title} 
                    onChange={
                        (evt) => {
                            const copy = { ...draft }
                            copy.title = evt.target.value
                            setDraft(copy)
                        }
                    } 
                    />
                </div>
                <div>
                    <textarea name="draft" required autoFocus type="text"
                    className="form-control" value={draft.content} onChange={
                        (evt) => {
                            const copy = { ... draft }
                            copy.content = evt.target.value
                            setDraft(copy)
                        }
                    } 
                    />
                </div>

                <div className="tutorial-checkbox-button-span">
                    <button className="tutorial-custom-green-button" type="submit" onClick={saveDraftEdit}>Save Changes</button>
                    <a href="/">No, take me back </a>

                
                </div>
            </fieldset>
            </div>
        </div>
        </>
    );

}

