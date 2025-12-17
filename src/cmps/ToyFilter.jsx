import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { ToySort } from './ToySort.jsx'

import { OutlinedInput, InputLabel, MenuItem, Select, FormControl, Chip, Box } from '@mui/material';

export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort, toyLabels = [] }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onClearFilter() {
        setFilterByToEdit({
            name: '',
            price: '',
            inStock: '',
            labels: [],
            sortBy: ''
        })
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target

        if (field === 'labels') {
            value = typeof value === 'string' ? value.split(',') : value
        }
        else if (type === 'number') {
            value = +value || ''
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="main-layout">
            <div
                className={`app-overlay ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>
            
            <section className={`toy-filter ${isOpen ? 'open' : ''}`}>

                <button
                    className="toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : 'Filter'}
                </button>

                <div className="filter-header">
                    <h3 className="title">Filter</h3>
                    <button className="btn-clear" onClick={onClearFilter}>Clear</button>
                </div>

                <form onSubmit={onSubmitFilter} className="filtering flex">
                    <div className="filter-left-side">
                        <input
                            className="filter-by-name"
                            type="search"
                            name="txt"
                            placeholder="Toy name"
                            value={txt}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            className="filter-by-price"
                            name="maxPrice"
                            placeholder="Max price"
                            min={50}
                            max={300}
                            step={50}
                            value={filterByToEdit.maxPrice || ''}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="filter-right-side">
                        <select
                            className="filter-by-stock"
                            name="inStock"
                            value={inStock || ''}
                            onChange={handleChange}>
                            <option value="">All</option>
                            <option value="true">In Stock</option>
                            <option value="false">Not in stock</option>
                        </select>

                        {toyLabels && (
                            <FormControl
                                className="div-select"
                                size="small"
                            >
                                <InputLabel id="labels-label">Labels</InputLabel>
                                <Select
                                    labelId="labels-label"
                                    multiple
                                    name="labels"
                                    className="select-labels"
                                    value={labels || []}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Labels" />}

                                    MenuProps={{
                                        PaperProps: {
                                            className: 'toy-filter-menu',
                                            style: {
                                                maxHeight: 200,
                                                width: 250,
                                            },
                                        }
                                    }}

                                    renderValue={(selected) => (
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'nowrap',
                                            gap: 0.5,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%'
                                        }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} size="small" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {toyLabels.map((label) => (
                                        <MenuItem key={label} value={label}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </div>

                </form>
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>
        </section>
    )
}
