import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }


    if (!toy) return <div className="loading">Loading...</div>
    const formattedDate = new Date(toy.createdAt).toLocaleString('he')
    return (
        <section className="toy-details">
            <h1 className="title">{toy.name}</h1>
            <h5 className={(toy.inStock) ? 'green' : 'red'}>{(toy.inStock) ? 'In stock ' : 'Not in stock'}</h5>
            <h5>Created: {formattedDate}</h5>
            <h5>Price: ${toy.price}</h5>
            <h5>Labels: {(toy.labels || []).join(', ')}</h5>

            {/* <p className="descruption-toy">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p> */}

            {/* <img className="toy-img" src={toy.imgUrl} alt="toy-img" /> */}

            <div className="links">
                <div>
                    <Link to={`/toy`}>Back</Link>
                </div>
                {/* <div>
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    &nbsp;
                </div> */}
                {/* <div>
                    <Link to="/toy/nmRU3">Next Toy</Link>
                </div> */}
            </div>

            <section>
                <PopUp
                    header={<h3>Chat About {toy.name}</h3>}
                    footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat />
                </PopUp>
            </section >
            {!isChatOpen && <button
                onClick={() => setIsChatOpen(true)}
                className='open-chat'
            >Chat </button>
            }
        </section>
    )
}