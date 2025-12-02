import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
// import { useOnlineStatus } from "../hooks/useOnlineStatusSyncStore.js"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        setHasUnsavedChanges(true)
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
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

    return (
        <>
            <div></div>
            <section className="toy-edit">
                <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

                <form onSubmit={onSaveToy} >
                    <label htmlFor="name">Name : </label>
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name..."
                        value={toyToEdit.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Price : </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                    />

                    <div>
                        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                    <section>
                        <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
                    </section>
                </form>
            </section>
        </>
    )
}


