import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import Select from "react-select"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const setFilterRef = useRef(
        utilService.debounce(onSetFilter, 300)
    )

    useEffect(() => {
        setFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            const values = []
            for (let i = 0; i < selectedOptions.length; i++) {
                values.push(selectedOptions[i].value)
            }
            value = values
        }
        value = type === 'number' ? +value : value
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }

    const options = [
        { value: "On wheels", label: "On wheels" },
        { value: "Box game", label: "Box game" },
        { value: "Art", label: "Art" },
        { value: "Baby", label: "Baby" },
        { value: "Doll", label: "Doll" },
        { value: "Puzzle", label: "Puzzle" },
        { value: "Outdoor", label: "Outdoor" },
        { value: "Battery Powered", label: "Battery Powered" },
    ]

    return (
        <section className="toy-filter">
            <h2 className="title">Filter</h2>

            <form className="filtering flex">

                <input 
                    className="filter-by-name"
                    type="text"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
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

                <Select
                    options={options}
                    isMulti
                    placeholder="Select labels..."
                    value={options.filter(opt =>
                        (filterByToEdit.labels || []).includes(opt.value)
                    )}
                    onChange={(selectedOptions) => {
                        const labels = selectedOptions.map(opt => opt.value)
                        setFilterByToEdit(prev => ({ ...prev, labels }))
                    }}
                />

            </form>
        </section>
    )
}
