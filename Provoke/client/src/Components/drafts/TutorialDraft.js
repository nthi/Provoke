//Renders a single published draft

export const TutorialDraft = ({ draftId, quote, author, title, content }) => {
    return (
        <>
        <div className="single-draft" key={draftId}>
            <h3 className="tutorial-headline-styling">{title}</h3>
            <div className="tutorial-quote-card">
                <div><i>{quote}</i> <b>-- {author}</b></div>
            </div>
            <p className="tutorial-paragraph-styling">{content}</p>

        </div>

        </>
    )
}