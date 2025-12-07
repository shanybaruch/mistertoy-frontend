import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { ToySort } from './ToySort'


export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        // console.log('value:', value)
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2 className="title">Filter</h2>

            <form onSubmit={onSubmitFilter} className="filtering flex">

                <input
                    className="filter-by-name"
                    type="text"
                    name="txt"
                    placeholder="Search by name"
                    value={txt}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    className="filter-by-price"
                    name="maxPrice"
                    placeholder="By max price"
                    min={50}
                    max={300}
                    step={50}
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <select
                    name="inStock"
                    value={inStock || ''}
                    onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not in stock</option>
                </select>

                {toyLabels &&
                    <select
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option disabled value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                }

            </form>
            <ToySort sortBy={sortBy} onSetSort={onSetSort} />
        </section>
    )
}
