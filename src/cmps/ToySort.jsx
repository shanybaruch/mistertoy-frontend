import { useState, useEffect } from 'react';

export function ToySort({ sortBy, onSetSort }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        setSortByToEdit(prevSort => ({
            ...prevSort,
            [field]: field === 'desc' ? -prevSort.desc : value,
            pageIdx: 0
        }))
    }

    return (
        <div className="toy-sort">
            <select
                name="type"
                value={sortByToEdit.type}
                onChange={handleChange}
            >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>
        </div>
    )
}
