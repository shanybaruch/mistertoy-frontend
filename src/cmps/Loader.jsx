export function Loader({ children, isLoading = true, text = 'Loading, please wait...' }) {
    return (
        isLoading
            ? <LoaderDots text={text} />
            : children
    )
}


export function LoaderDots({ text = 'Loading, please wait...' }) {
    return (
        <section className="loader-container">
            <div className="animation">
                <span></span>
                <span className="dot2"></span>
                <span></span>
            </div>
            <p>{text}</p>
        </section>
    )

}