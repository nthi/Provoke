//Renders a single published draft

export const Draft = ({ draftId, quote, author, title, content }) => {
    return (
        <>
        <div className="single-draft" key={draftId}>
            <h3>{title}</h3>
            <div className="quote-card">
                <div><i>{quote}</i> <b>-- {author}</b></div>
            </div>
            <p>{content}</p>

        </div>

        </>
    )
}