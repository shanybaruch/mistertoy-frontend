export function ToySort({ sortBy, onSetSort }) {

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'checkbox' ? (target.checked ? -1 : 1) : target.value

        const updatedSort = { ...sortBy, [field]: value }
        
        onSetSort(updatedSort)
    }

    return (
        <div className="toy-sort">
            <select
                className="sort-select"
                name="type" 
                value={sortBy.type || ''}
                onChange={handleChange}
            >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>

            {/* <label className="sort-desc">
                <input 
                    type="checkbox" 
                    name="desc"
                    checked={sortBy.desc === -1}
                    onChange={handleChange}
                />
                Descending
            </label> */}
        </div>
    )
}