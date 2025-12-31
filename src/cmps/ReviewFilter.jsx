import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ReviewFilter({ filterBy, onSetFilter, sortBy, onSetSort }) {
    const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        let { value, name: field, type } = ev.target

        if (type === 'number') {
            value = +value || ''
        }

        setfilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onClearFilter() {
        setfilterByToEdit(prev => ({
            ...prev,
            txt: '',
            sortBy: ''
        }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="review-filter">
            <form onSubmit={onSubmitFilter}>
                <input
                    className="filter-by-txt"
                    type="search"
                    name="txt"
                    placeholder="Review filter.."
                    value={filterByToEdit.txt || ''}
                    onChange={handleChange}
                />
            </form>
            <button className="btn-clear" onClick={onClearFilter}>Clear</button>

        </section>
    )
}