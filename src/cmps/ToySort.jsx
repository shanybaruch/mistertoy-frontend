import { utilService } from "../services/util.service.js"
import { useState, useRef } from 'react';

export function ToySort({ onSetFilter }) {


    const [sortBy, setSortBy] = useState('')
    const [inStock, setInStock] = useState(false)

    const debouncedSetSort = useRef(
        utilService.debounce((sort,stock) => {
            onSetFilter({ sortBy: sort, inStock: stock })
        }, 500)
    ).current

  function handleSortChange(ev) {
        const value = ev.target.value
        setSortBy(value)
        debouncedSetSort(value, inStock)
    }

    function handleInStockChange(ev) {
        const value = ev.target.checked
        setInStock(value)
        debouncedSetSort(sortBy, value)
    }

    return (
        <div className="toy-sort">

            <select 
            name="sortBy" 
            value={sortBy} 
            onChange={handleSortChange}
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
                checked={inStock}
                onChange={handleInStockChange}
            />
            <label htmlFor="instock">In stock</label>

        </div>
    )
}
