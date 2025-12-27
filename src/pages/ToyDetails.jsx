import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate, Navigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useSelector } from "react-redux"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

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
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), savedMsg]
            }))
            ev.target.reset()
            showSuccessMsg('Message added to toy!')
        } catch (err) {
            console.log('Cannot add message to database: ', err);
            showErrorMsg('Cannot add message to database')
        }
    }

    function onClickBack() {
        navigate(-1)
    }

    async function onRemoveToyMsg(msgId) {
        try {
            await toyService.removeMsg(toy._id, msgId)
            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(m => m.id !== msgId)
            }))
            showSuccessMsg('Message removed')
        } catch (err) {
            showErrorMsg('Cannot remove message')
        }
    }

    console.log('toy: ', toy)
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
                    <button className="btn-back"
                        onClick={onClickBack}
                    >Back</button>
                </div>
                {/* <div>
                    <Link to={`/toy/edit/${toy?._id}`}>Edit</Link>
                    &nbsp;
                </div> */}
                {/* <div>
                    <Link to="/toy/nmRU3">Next Toy</Link>
                </div> */}
            </div>

            <section
                className="toy-db-messages"
                style={{
                    marginBottom: '10px',
                    paddingBottom: '10px'
                }}>
                <h3 className="title-comment">Comments</h3>
                <ul
                    className="clean-list"
                    style={{
                        maxHeight: '150px',
                        overflowY: 'auto'
                    }}>
                    {toy?.msgs && toy.msgs.length > 0 ? (
                        toy.msgs.map(msg => (
                            <li key={msg.id} style={{ marginBottom: '8px' }}>
                                <div className="flex align-center">
                                    {user && (user.isAdmin || user._id === msg.by?._id) && (
                                        <button
                                            className="btn-remove-msg"
                                            onClick={() => onRemoveToyMsg(msg.id)}
                                            style={{ float: 'right', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                        >
                                            x
                                        </button>
                                    )}
                                    {msg.by?.fullname &&
                                        <p className="txt-comment" style={{ margin: 0 }}><span className="name-comment">{msg.by.fullname}:</span> {msg.txt}</p>
                                    }
                                </div>
                                <p
                                    className="date-comment"
                                    style={{ color: 'var(--gray2)' }}>{new Date(msg.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>No comments yet...</p>
                    )}
                </ul>
                {user ? (
                    <form className="msg-form" onSubmit={onSaveToyMsg}>
                        <input type="text" name="msgTxt" placeholder="Write a comment..." required />
                        <button>Post</button>
                    </form>
                ) : (
                    <p className="no-comment">Please login to comment</p>
                )}
            </section>

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