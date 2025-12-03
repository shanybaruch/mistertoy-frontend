// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Filter</h2>
            <form >
                {/* <label htmlFor="name">Name:</label> */}
                <input type="text"
                    id="name"
                    name="txt"
                    className="filter-by-name"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                {/* <label htmlFor="maxPrice">Max price:</label> */}
                <input type="number"
                    id="maxPrice"
                    min={50}
                    step={50}
                    max={300}
                    className="filter-by-price"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                {/* <label htmlFor="minSpeed">Min Speed:</label>
                <input type="number"
                    id="minSpeed"
                    name="minSpeed"
                    placeholder="By min speed"
                    value={filterByToEdit.minSpeed || ''}
                    onChange={handleChange}
                /> */}

            </form>

        </section>
    )
}