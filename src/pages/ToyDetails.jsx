import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    async function onSaveToyMsg(ev) {
        ev.preventDefault()
        const txt = ev.target.elements.msgTxt.value
        try {
            const savedMsg = await toyService.addMsg(toy._id, txt)

            const updatedMsgs = [...(toy.msgs || []), savedMsg]
            onToyUpdate({ ...toy, msgs: updatedMsgs })

            ev.target.reset()
            showSuccessMsg('Message added to toy!')
        } catch (err) {
            showErrorMsg('Cannot add message to database')
        }
    }

    async function onRemoveToyMsg(msgId) {
        try {
            await toyService.removeMsg(toy._id, msgId)
            const updatedMsgs = toy.msgs.filter(m => m.id !== msgId)
            onToyUpdate({ ...toy, msgs: updatedMsgs })
            showSuccessMsg('Message removed')
        } catch (err) {
            showErrorMsg('Cannot remove message')
        }
    }

    if (!toy) return <div className="loading">Loading...</div>
    const formattedDate = new Date(toy.createdAt).toLocaleString('he')
    return (
        <section className="toy-details">
            <div className="top-page">
                <h1 className="title">{toy.name}</h1>

                <div className="body-details flex">

                    <div className="main-details">
                        <h5>Created: <span>{formattedDate}</span></h5>
                        <h5>Price: <span>${toy.price}</span></h5>
                        <h5>Labels: <span>{(toy.labels || []).join(', ')}</span></h5>
                    </div>
                    <div className="div-img-stock">
                        <img className="toy-img" src={toy.imgUrl} alt="toy-img" />
                        <h5 className={(toy.inStock) ? 'in-stock' : 'not-in-stock'}>{(toy.inStock) ? 'In stock ' : 'Not in stock'}</h5>
                    </div>
                </div>
            </div>

            <div className="links bottom-page">
                <div>
                    <Link className="btn-back" to={`/toy`}>Back</Link>
                </div>
                {/* <div>
                    <Link to={`/toy/edit/${toy?._id}`}>Edit</Link>
                    &nbsp;
                </div> */}
                {/* <div>
                    <Link to="/toy/nmRU3">Next Toy</Link>
                </div> */}
            </div>

            {/* <section className="toy-db-messages">
                <h3>Reviews & Comments</h3>
                <ul className="clean-list msg-list">
                    {toy.msgs && toy.msgs.length > 0 ? (
                        toy.msgs.map(msg => (
                            <li key={msg.id} className="msg-item">
                                <button className="btn-remove" onClick={() => onRemoveToyMsg(msg.id)}>x</button>
                                <p>"{msg.txt}"</p>
                                <small>By: <b>{msg.by?.fullname || 'Guest'}</b></small>
                            </li>
                        ))
                    ) : (
                        <p>No reviews yet...</p>
                    )}
                </ul>

                <form className="msg-form" onSubmit={onSaveToyMsg}>
                    <input type="text" name="msgTxt" placeholder="Post a public comment..." required />
                    <button>Post</button>
                </form>
            </section> */}

            <section className="toy-messages">
                <PopUp
                    header={<h3>Customer Support - {toy.name}</h3>}
                    footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat
                        toy={toy}
                        onToyUpdate={(updatedToy) => setToy(updatedToy)}
                    />
                </PopUp>
            </section >
            {
                !isChatOpen && <button
                    onClick={() => setIsChatOpen(true)}
                    className='open-chat'
                >Chat </button>
            }
        </section >
    )
}