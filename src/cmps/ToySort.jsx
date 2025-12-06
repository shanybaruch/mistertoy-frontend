import { useState } from 'react';

export function ToySort({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ sortBy: '', inStock: false })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value

        setFilterByToEdit(prevFilter => {
            const updatedFilter = { ...prevFilter, [field]: value }
            onSetFilter(updatedFilter)
            return updatedFilter
        })
    }

    return (
        <div className="toy-sort">

            <select
                name="sortBy"
                value={filterByToEdit.sortBy}
                onChange={handleChange}
            >
                <option value="">Sort By</option>
                <option value="txt">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>

            <input
                id="instock"
                type="checkbox"
                name="inStock"
                checked={filterByToEdit.inStock}
                onChange={handleChange}
            />
            <label htmlFor="instock">In stock</label>

        </div>
    )
}
