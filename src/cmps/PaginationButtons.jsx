export function PaginationButtons({ pageIdx, maxPage, onChangePageIdx }) {

    const isLastPage = (pageIdx + 1) >= maxPage

    return (
        <div className="pagination">
            <button
                className="btn-prev"
                onClick={() => { onChangePageIdx(-1) }}
                disabled={pageIdx === 0}
            >
                Previous
            </button>
            {pageIdx + 1} - {maxPage}
            <button
                className="btn-next"
                onClick={() => { onChangePageIdx(1) }}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>
    )
}
