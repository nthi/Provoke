//Renders a single published draft
import { Tooltip } from "react-tooltip";



export const TutorialDraft = ({ draftId, quote, author, title, content }) => {
    return (
        <>
        <div className="single-draft" key={draftId}>
            <h3 
            id="published-title-element"
            data-tooltip-content="This is the title you wrote just a moment ago."
            className="tutorial-headline-styling">{title}</h3>
            <Tooltip 
                anchorId="published-title-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>
            <div className="tutorial-quote-card">
                <div><i>{quote}</i> <b>-- {author}</b></div>
            </div>
            <p 
            id="published-content-element"
            data-tooltip-content="WOW! This is what you wrote. You can emend or excise it if you're not pleased."
            className="tutorial-paragraph-styling">{content}</p>
            <Tooltip 
                anchorId="published-content-element" 
                style={{color:"#D81E5B", fontSize:"1rem", backgroundColor:"#E0FF4F", fontFamily:"'Press Start 2P', cursive", margin:"1rem"}} offset="20"/>

        </div>

        </>
    )
}