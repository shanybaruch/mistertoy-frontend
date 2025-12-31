import { useEffect, useRef, useState } from "react"
import { setFilter, setSort } from "../store/actions/review.actions.js"
import { utilService } from "../services/util.service.js"

export function ReviewFilter({ filterby, sortBy }) {
    // const filterBy = useSelector(storeState => storeState.reviewModule.filterBy)
    // const sortBy = useSelector(storeState => storeState.reviewModule.sortBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterby })
    const [sortByToEdit, setsortByToEdit] = useState({ ...sortBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterby, sortBy])

    function handleChange(ev) {
        let { value, name: field, type } = ev.target

        if (type === 'number') {
            value = +value || ''
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    function onClearFilter() {
        setFilterByToEdit({
            txt: '',
            sortBy: ''
        })
    }
    return (
        <section className="review-filter">
            <input
                className="filter-by-txt"
                type="search"
                name="txt"
                placeholder="Review txt.."
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
            <button className="btn-clear" onClick={onClearFilter}>Clear</button>

        </section>
    )
}