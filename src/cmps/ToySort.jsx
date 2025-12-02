import { utilService } from "../services/util.service.js"
import { useState, useRef } from 'react';


export function ToySort({ onSetFilter }) {

    const [sortBy, setSortBy] = useState('')

    const debouncedSetSort = useRef(utilService.debounce((val) => {
        onSetFilter({ sortBy: val })
    }, 500)
    ).current

    function handleChange(ev) {
        const value = ev.target.value
        setSortBy(value)
        debouncedSetSort(value)
    }

    return (
        <div className="toy-sort">
            <select value={sortBy} name="sortBy" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="txt">Name</option>
                <option value="price">Price</option>
                <option value="created">Created</option>
            </select>
        </div>
    )
}
