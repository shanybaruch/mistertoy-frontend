import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate, Navigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useSelector } from "react-redux"
import { loadReviews, removeReview, addReview } from '../store/actions/review.actions.js'
import { Loader } from "../cmps/Loader.jsx"
import { uploadService } from "../services/upload.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (toyId) {
            loadToy()
            loadReviews({ toyId })
        }
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

    async function onUploadGalleryImg(ev) {
        setIsUploading(true)
        try {
            const imgUrl = await uploadService.uploadImg(ev, 'toys_app/gallery')
            const updatedToy = await toyService.addToyImg(toy, imgUrl)
            setToy(updatedToy)
            showSuccessMsg('Image added to gallery!')
        } catch (err) {
            console.log('Failed to upload', err)
            showErrorMsg('Failed to upload image')
        } finally {
            setIsUploading(false)
        }
    }

    async function onSaveToyMsg(ev) {
        ev.preventDefault()
        const txt = ev.target.elements.msgTxt.value
        try {
            const savedMsg = await toyService.addMsg(toy._id, txt, msgImg)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), savedMsg]
            }))
            ev.target.reset()
            setMsgImg(null)
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

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        const txt = ev.target.elements.reviewTxt.value
        try {
            await addReview({
                txt,
                toyId,
            })
            ev.target.reset()
            showSuccessMsg('Review Added')
        } catch (err) {
            showErrorMsg('Cannot add')
        }
    }

    async function onRemoveGalleryImg(imgId) {
        try {
            await toyService.removeToyImg(toy._id, imgId)

            setToy(prevToy => ({
                ...prevToy,
                gallery: prevToy.gallery.filter(img => img.id !== imgId)
            }))
            showSuccessMsg('Image removed')
        } catch (err) {
            showErrorMsg('Cannot remove image')
        }
    }

    // console.log('toy: ', toy)
    // console.log('user: ', user)
    console.log('reviews: ', reviews)

    if (!toy) return <Loader />
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
                {/* {user.isAdmin &&
                    <div>
                        <Link to={`/toy/edit/${toy?._id}`}>Edit</Link>
                        &nbsp;
                    </div>
                } */}
            </div>
            <section
                className="section-reviews-messages"
            >
                <section className="section-reviews">
                    <h3 className="title-review">Reviews</h3>
                    <ul className="clean-list">
                        {
                            reviews && reviews.length > 0 ? (
                                reviews.map(review => (
                                    <li key={review._id}>
                                        <div className="flex align-center">
                                            {(user.isAdmin || user._id === review.user?._id) && (
                                                <button
                                                    className="btn-remove-rvw"
                                                    onClick={() => onRemoveReview(review._id)}
                                                    style={{ float: 'right', border: 'none', background: 'none', cursor: 'pointer' }}
                                                >
                                                    x
                                                </button>
                                            )}

                                            {review.user?.fullname &&
                                                <p className="txt-review" style={{ margin: 0 }}>
                                                    <span className="name-review">{review.user.fullname}:</span> {review.txt}
                                                </p>
                                            }
                                        </div>
                                        <p className="date-review" style={{ color: 'var(--gray2)' }}>
                                            {new Date(review.createdAt || Date.now()).toLocaleDateString('he-IL')} 
                                                                                   </p>
                                    </li>
                                ))
                            ) : (
                                <p className="no-comment">No reviews yet...</p>
                            )
                        }
                    </ul>
                    {user ? (
                        <form className="review-form" onSubmit={onAddReview}>
                            <input type="text" name="reviewTxt" placeholder="Write a review..." required />
                            <button>Post</button>
                        </form>
                    ) : (
                        <p className="no-comment-login">Please login to review</p>
                    )}
                </section>
                <section className="section-comments">
                    <h3 className="title-comment">Comments</h3>
                    <ul className="clean-list">
                        {user && (
                            toy?.msgs && toy.msgs.length > 0 ? (
                                toy.msgs.map(msg => (
                                    <li key={msg.id}>
                                        <div className="flex align-center">
                                            {(user.isAdmin || user._id === msg.by?._id) && (
                                                <button
                                                    className="btn-remove-msg"
                                                    onClick={() => onRemoveToyMsg(msg.id)}
                                                    style={{ float: 'right', border: 'none', background: 'none', cursor: 'pointer' }}
                                                >
                                                    x
                                                </button>
                                            )}

                                            {msg.by?.fullname &&
                                                <div className="msg-content">
                                                    <p className="txt-comment" style={{ margin: 0 }}>
                                                        <span className="name-comment">{msg.by.fullname}:</span> {msg.txt}
                                                    </p>
                                                    {msg.imgUrl && (
                                                        <img
                                                            src={msg.imgUrl}
                                                            alt="comment-img"
                                                            style={{ maxWidth: '150px', display: 'block', marginTop: '5px', borderRadius: '5px' }}
                                                        />
                                                    )}
                                                </div>
                                            }
                                        </div>
                                        <p className="date-comment" style={{ color: 'var(--gray2)' }}>
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p className="no-comment">No comments yet...</p>
                            )
                        )}
                    </ul>
                    {user ? (
                        <form className="msg-form" onSubmit={onSaveToyMsg}>
                            <input type="text" name="msgTxt" placeholder="Write a comment..." required />
                            <button>Post</button>
                        </form>
                    ) : (
                        <p className="no-comment-login">Please login to comment</p>
                    )}
                </section>
            </section>

            <section className="customer-gallery">
                <h3 className="title title-gallery">Customer Photos</h3>

                {user ? (
                    <div className="upload-section">
                        <label
                            htmlFor="gallery-upload"
                            className="btn-upload"
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                            {isUploading ? 'Uploading...' : 'Add your photo +'}
                        </label>
                        <input
                            type="file"
                            id="gallery-upload"
                            onChange={onUploadGalleryImg}
                            style={{ display: 'none' }}
                            disabled={isUploading}
                        />
                    </div>
                ) : (
                    <p>Login to add photos</p>
                )}

                <div
                    className="gallery-grid"
                    style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                    {toy.gallery && toy.gallery.map((imgItem) => {
                        if (!imgItem) return null
                        const imgUrl = imgItem.url || imgItem
                        const imgId = imgItem.id
                        const imgOwnerId = imgItem.by

                        const isOwner = user && (user.isAdmin || (imgOwnerId && user._id === imgOwnerId))

                        return (
                            <div key={imgId || imgUrl} className="gallery-item" style={{ position: 'relative' }}>
                                <img
                                    src={imgUrl}
                                    alt="Gallery"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />

                                {isOwner && (
                                    <button
                                        onClick={() => onRemoveGalleryImg(imgId)}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: 'red',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
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
            {!isChatOpen &&
                <button
                    onClick={() => setIsChatOpen(true)}
                    className='open-chat'
                >Chat
                </button>
            }
        </section >
    )
}