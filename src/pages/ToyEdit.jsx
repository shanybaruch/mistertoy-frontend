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

    function loadToy() {
        if (!toyId) return
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
                showErrorMsg('Toy not found')
            })
    }

    function loadToyLabels() {
        toyService.getToyLabels()
            .then(setLabels)
            .catch(err => {
                console.log('Had issues in toy edit:', err)
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
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

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    const priceValidations = {
        min: "1",
        required: true
    }

    return (
        <>
            <section className="toy-edit">
                <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
                <form onSubmit={onSaveToy} >

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
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
                            min={50}
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


