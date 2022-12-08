//Renders a single published draft

export const Draft = ({ key, title, content }) => {
    return (
        <>
        <div className="single_draft" key={key}>
            <h3>{title}</h3>
            <p>{content}</p>

        </div>

        </>
    )
}