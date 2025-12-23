import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        loadToy()
        loadToyLabels()
    }, [])

    async function loadToy() {
        if (!toyId) return
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
            showErrorMsg('Toy not found')
        }
    }

    async function loadToyLabels() {
        try {
            const labelsToy = await toyService.getToyLabels()
            
            setLabels(labelsToy)
        } catch (err) {
            console.log('Had issues in toy edit:', err)
            navigate('/toy')
            showErrorMsg('Could not load labels')
        }
    }
    
    function handleChange({ target }) {
        const { name, value, type, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        } else if (type === 'select-multiple') {
            fieldValue = [...target.selectedOptions].map(option => option.value)
        }
        
        setToyToEdit(prevToy => ({
            ...prevToy,
            [name]: fieldValue
        }))
    }
    
    async function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        try {
            await saveToy(toyToEdit)
            showSuccessMsg('Toy Saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
    }
    
    const priceValidations = {
        min: "1",
        required: true
    }
    
    return (
        <>
            <section className="toy-edit">
                <h2>{toyToEdit._id ? `Edit ${toyToEdit.name}` : 'Add Toy'}</h2>
                <form onSubmit={onSaveToy} >

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="search"
                            name="name"
                            value={toyToEdit.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter name..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={toyToEdit.price || ''}
                            {...priceValidations}
                            onChange={handleChange}
                            min={10}
                            max={300}
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="labels">Labels:</label>
                        <select
                            id="labels"
                            name="labels"
                            multiple
                            value={toyToEdit.labels}
                            onChange={handleChange}
                        >
                            {labels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {toyToEdit._id && (
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={toyToEdit.inStock}
                                    onChange={handleChange}
                                />
                                In Stock
                            </label>
                        </div>
                    )}

                    <div>
                        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                </form>
            </section>
        </>
    )
}


